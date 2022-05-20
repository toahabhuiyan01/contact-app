import {useState, useRef, useLayoutEffect, useCallback, useEffect} from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@mui/icons-material/Add';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import axios from 'axios';
import debounce from 'lodash/debounce';

import {Contact, messageSR, queryObject, selectTags, tag, tags} from "./../../utils/interfaces"
import SinglePerson from '../../components/SinglePerson/SinglePerson';

import TagTable from '../../components/TagTable/TagTable'
import CheckBoxGlobal from '../../components/CheckBoxGlobal/CheckBoxGlobal'
import {Contacts} from './../../utils/interfaces';

import './static/style.scss';
import {LinearProgress} from '@material-ui/core';
import ModalGlobal from '../../components/ModalGlobal/ModalGlobal';

const qs = require('qs');

const AllContacts = () => {
    const tableEl = useRef<HTMLHeadingElement>(null);
    const isMounted = useRef<boolean>(true);
    const [allTags, setAllTags] = useState<tag[]>([]);

    const showedModal = !!JSON.parse(localStorage.getItem("initialModal"));
    const [initialModal, setInitialModal] = useState<boolean>(!showedModal && false);
    const [progress, setProgress] = useState<number>(0);

    const [totalContacts, setTotalContacts] = useState<number>(0);
    const [selectedContacts, setSelectedContacts] = useState<selectTags>({});
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [totalSelected, setTotalSelected] = useState<number>(0);
    const [nextPage, setNextPage] = useState<string | null>("");
    const [lastQuery, setLastQuery] = useState<queryObject>(null);

    const [allContacts, setAllContacts] = useState<Contact[]>([]);

    const [loading, setLoading] = useState(false);
    const [distanceBottom, setDistanceBottom] = useState(0);
    const [includeTags, setIncludeTags] = useState<selectTags>({});
    const [excludeTags, setExcludeTags] = useState<selectTags>({});

    const [messageSent, setMessageSent] = useState<messageSR>({
        min: "",
        max: ""
    })

    const [messageReceived, setMessageReceived] = useState<messageSR>({
        min: "",
        max: ""
    });

    const [query, setQuery] = useState<string>("");


    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        if (progress < 100) {
            setTimeout(() => {
                setProgress(prevState => (prevState + 1));
            }, 10);
        } else {
            onCloseModal();
        }
    }, [progress]);

    const onCloseModal = () => {
        localStorage.setItem("initialModal", "true");
        setInitialModal(false);
    }

    const getContacts = (paramObj?: queryObject, isInit: boolean = true) => {
        setLoading(true);
        // const params = new URLSearchParams(paramObj);
        axios.get<Contacts>(`contacts`, {
            params: paramObj,
            paramsSerializer: function (params) {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        })
            .then(res => {
                console.log(res.data);
                if (isInit) {
                    setAllContacts(res.data.contacts);
                } else {
                    setAllContacts(prev => ([...prev, ...res.data.contacts]));
                }
                setTotalContacts(res.data.totalCount);
                setNextPage(res.data.nextPage);

                if (res.data.nextPage) {
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }

            })
            .catch(err => {

            })
            .finally(() => {
                setLoading(false);
            })
    }

    const getTags = () => {
        axios.get<tags>("tags")
            .then(res => {
                console.log(res.data);
                if (res.data.tags.length) {
                    setAllTags(res.data.tags);
                }
            })
            .catch(err => {

            })
            .finally(() => {

            })
    };

    const onClickSave = (newQ: string = "") => {
        const tags = Object.entries(includeTags)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => key);

        const notTags = Object.entries(excludeTags)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => key);

        const payload: queryObject = {
            returnTotalCount: true,
            maxMessagesRecv: Number(messageReceived.max) || undefined,
            minMessagesRecv: Number(messageReceived.min) || undefined,
            maxMessagesSent: Number(messageSent.max) || undefined,
            minMessagesSent: Number(messageSent.min) || undefined,
            tags: tags,
            notTags: notTags,
            q: newQ.length ? newQ : query || undefined
        }

        setLastQuery(payload);
        getContacts(payload);
    }

    const onSelectAll = (state: boolean) => {
        allContacts.map(contact => {
            setSelectedContacts(prev => {
                return {
                    ...prev,
                    [contact.id]: state
                }
            })
        });
        setAllSelected(state);
        if (state) {
            setTotalSelected(allContacts.length);
        } else {
            setTotalSelected(0);
        }
    };

    useEffect(() => {
        if (!isMounted.current) return;
        isMounted.current = false;

        getContacts({returnTotalCount: true});
        getTags();
    }, []);

    useEffect(() => {
        if (allContacts.length) {
            // getMiddle();
            if (totalSelected === allContacts.length) {
                setAllSelected(true);
            } else {
                setAllSelected(false);
            }
        } else {
            setAllSelected(false);
        }
    }, [totalSelected, allContacts]);

    const loadMore = useCallback(() => {
        const newQuery: queryObject = {
            ...lastQuery,
            page: encodeURI(nextPage)
        }
        getContacts(newQuery, false);
    }, [allContacts])

    const scrollListener = useCallback(() => {
        if (tableEl?.current) {
            let bottom = tableEl.current?.scrollHeight - tableEl.current?.clientHeight

            if (!distanceBottom) {
                setDistanceBottom(Math.round((bottom / 100) * 20))
            }

            if (tableEl.current?.scrollTop > bottom - distanceBottom && hasMore && !loading) {
                loadMore()
            }
        }
    }, [hasMore, loadMore, loading, distanceBottom])

    useLayoutEffect(() => {
        const tableRef = tableEl?.current
        tableRef?.addEventListener('scroll', scrollListener)
        return () => {
            tableRef?.removeEventListener('scroll', scrollListener)
        }
    }, [scrollListener]);

    const saveByQueryMiddleware = (value: string) => {
        const newQuery: queryObject = {
            ...lastQuery,
            q: value,
            returnTotalCount: true
        }
        getContacts(newQuery, true);
    }

    const getContactsByQuery = useCallback(
        debounce((value: string) => saveByQueryMiddleware(value), 500)
        , []);


    return (
        <div className='main-body-container w-100'>
            <div className="left-container">
                <>
                    <div className='filter-header'>
                        <div className="audiance">
                            <FormatAlignRightIcon/><h3>Audience</h3>
                        </div>
                        <div className="contacts">
                            {totalContacts} Contacts
                        </div>
                    </div>
                </>

                <>
                    <div className="tag-header">
                        <h5>Include Tags:</h5>
                    </div>
                    <TagTable
                        tags={allTags}
                        selectedTags={includeTags}
                        cbSelect={setIncludeTags}
                    />
                </>

                <>
                    <div className="tag-header">
                        <h5>Exclude Tags:</h5>
                    </div>
                    <TagTable
                        tags={allTags}
                        selectedTags={excludeTags}
                        cbSelect={setExcludeTags}
                    />
                </>

                <>
                    <div className="tag-header">
                        <h5>Message Sent:</h5>
                    </div>
                    <div className="input-fields">
                        <input
                            placeholder='Min'
                            value={messageSent.min}
                            onChange={e => {
                                if (!Number(e.target.value) && e.target.value) {
                                    return;
                                }
                                setMessageSent((prev: messageSR) => ({
                                    ...prev,
                                    min: e.target.value
                                }))
                            }}
                        />
                        <input
                            placeholder='Max'
                            value={messageSent.max}
                            onChange={e => {
                                if (!Number(e.target.value) && e.target.value) {
                                    return;
                                }
                                setMessageSent((prev: messageSR) => ({
                                    ...prev,
                                    max: e.target.value
                                }))
                            }}
                        />
                    </div>
                </>

                <>
                    <div className="tag-header">
                        <h5>Message Received:</h5>
                    </div>
                    <div className="input-fields">
                        <input
                            placeholder='Min'
                            value={messageReceived.min}
                            onChange={e => {
                                if (!Number(e.target.value) && e.target.value) {
                                    return;
                                }
                                setMessageReceived((prev: messageSR) => ({
                                    ...prev,
                                    min: e.target.value
                                }))
                            }}
                        />
                        <input
                            placeholder='Max'
                            value={messageReceived.max}
                            onChange={e => {
                                if (!Number(e.target.value) && e.target.value) {
                                    return;
                                }
                                setMessageReceived((prev: messageSR) => ({
                                    ...prev,
                                    max: e.target.value
                                }))
                            }}
                        />
                    </div>
                </>

                <div className="save-filter-section">
                    <button onClick={() => onClickSave()} className="save-filters">Save Filters</button>
                </div>


            </div>
            <div className="right-container">
                <TableContainer style={{maxWidth: '900px', margin: 'auto', maxHeight: '100vh', overflowX: "hidden"}}
                                ref={tableEl}>
                    <div className="table-header">
                        <div className="contacts-head">
                            <h3>All Contacts ({totalContacts})</h3>

                            <div className="add-new">
                                <AddIcon/>
                            </div>
                        </div>
                        <div className="search-box">
                            <input
                                placeholder='Search Contacts'
                                value={query}
                                onChange={e => {
                                    setQuery(e.target.value);
                                    getContactsByQuery(e.target.value);
                                }}
                            />
                        </div>
                        <div className="select-box">
                            <div className='left-select'>
                                <CheckBoxGlobal
                                    checked={allSelected}
                                    onChange={(e) => {
                                        onSelectAll(e.target.checked);
                                    }}
                                /> <span>Select All</span>
                            </div>
                            <div className="right-select">
                                <button>Export All</button>
                            </div>
                        </div>
                    </div>
                    {allContacts.map((contact: Contact) => (
                        <div key={`contact-${contact.id}`} style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginRight: "15px"
                        }}>
                            <SinglePerson
                                contact={contact}
                                selectedContacts={selectedContacts}
                                onSelectRemove={setSelectedContacts}
                                setTotalSelected={setTotalSelected}
                            />
                        </div>
                    ))}
                    {
                        !allContacts.length && <p style={{textAlign: "center"}}>No Contacts Found!</p>
                    }
                </TableContainer>
                {loading && <CircularProgress style={{position: 'absolute', top: '50%', left: "50%"}}/>}
            </div>
            <ModalGlobal
                hideBackdrop={false}
                open={initialModal}
                handleOpen={() => setInitialModal(true)}
                handleSubmit={onCloseModal}
                submitButtonText={"Close"}
            >
                <>
                    You need to Click on <i><strong>Save Filters</strong></i> to search with tags.
                    <LinearProgress style={{width: "500px", marginTop: "10px", height: "1px"}} variant="determinate"
                                    value={progress}/>
                </>
            </ModalGlobal>
        </div>
    )
}

export default AllContacts;