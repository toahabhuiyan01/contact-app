import { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@mui/icons-material/Add';

import {Contact, lol, messageSR, selectTags, tag, tags} from "./../../utils/interfaces"
import SinglePerson from '../../components/SinglePerson/SinglePerson'

import './static/style.scss';
import TagTable from '../../components/TagTable/TagTable'
import CheckBoxGlobal from '../../components/CheckBoxGlobal/CheckBoxGlobal'
import AxiosServices from '../../networks/ApiService';
import {Contacts} from './../../utils/interfaces';
import axios from 'axios'

const generateItems = (amount: number) => {
  const arr = Array.from(Array(amount))
  return arr.map((number: number, i: number) => ({
    id: i,
    name: `hafiz ${i + 1}`,
    type: `Item Type ${i + 1}`,
  }))
}

const AllContacts = () => {
  const tableEl = useRef<HTMLHeadingElement>(null);
  const [rows, setRows] = useState(generateItems(50));
  const [allTags, setAllTags] = useState<tag[]>([]);
  
  const [totalContacts, setTotalContacts] = useState<number>(0);
  const [selectedContacts, setSelectedContacts] = useState<selectTags>({});

  const [allContacts, setAllContacts] = useState<Contact[]>([])
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

  const getContacts = () => {
    axios.get<Contacts>("contacts?returnTotalCount=true")
    .then(res => {
      console.log(res.data);
      setAllContacts(res.data.contacts);
      setTotalContacts(res.data.totalCount);
    })
    .catch(err => {

    })
    .finally(() => {

    })
  }
  
  const getTags = () => {
    axios.get<tags>("tags")
    .then(res => {
      console.log(res.data);
      if(res.data.tags.length) {
        setAllTags(res.data.tags);
      }
    })
    .catch(err => {

    })
    .finally(() => {

    })
  }

  useEffect(() => {
    getContacts();
    getTags();
  }, [])

  const loadMore = useCallback(() => {
    const loadItems = async () => {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                setRows(generateItems(rows.length + 50));
                setLoading(false);
            }, 5000)
        })
    }
    setLoading(true);
    loadItems();
  }, [rows])

  const scrollListener = useCallback(() => {
    if(tableEl?.current) {
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

  return (
    <div className='main-body-container w-100'>
      <div className="left-container">
        <>
          <div className='filter-header'>
            <div className="audiance">
                <h3>Audience</h3>
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
                if(!Number(e.target.value) && e.target.value) {
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
                if(!Number(e.target.value) && e.target.value) {
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
                if(!Number(e.target.value) && e.target.value) {
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
                if(!Number(e.target.value) && e.target.value) {
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


      </div>
      <div className="right-container">
        <TableContainer style={{ maxWidth: '900px', margin: 'auto', maxHeight: '100vh', overflowX: "hidden" }} ref={tableEl}>
          <div className="table-header">
            <div className="contacts-head">
              <h3>All Contacts ({totalContacts})</h3>

              <div className="add-new">
                <AddIcon />
              </div>
            </div>
            <div className="search-box">
              <input
                placeholder='Search Contacts'
                value={query}
                onChange={e => {
                  setQuery(e.target.value)
                }}
              />
            </div>
            <div className="select-box">
              <div className='left-select'>
                <CheckBoxGlobal
                  checked={false}
                  onChange={() => {}}
                /> <span>Select All</span>
              </div>
              <div className="right-select">
                <button>Export All</button>
              </div>
            </div>
          </div>
          {loading && <CircularProgress style={{ position: 'absolute', top: '100px' }} />}
          <Table stickyHeader>
            <TableBody>
              {rows.map(({ id, name, type }: lol) => (
                <>
                    <TableRow style={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginRight: "15px"}}>
                        <SinglePerson />
                    </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default AllContacts;