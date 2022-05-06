import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

import CheckBoxGlobal from "../CheckBoxGlobal/CheckBoxGlobal";
import { SinglePerson as SP, selectTags } from '../../utils/interfaces';
import "./static/style.scss";

const SinglePerson: React.FC<SP> = ({contact, selectedContacts, onSelectRemove, setTotalSelected}: SP) => {

    return (
        <div className='card-container'>
            <div style={{borderBottom: "1px solid #F3F5F9"}} className="left">
                <div className="checkbox">
                    <CheckBoxGlobal
                        checked={!!selectedContacts?.[contact.id]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if(e.target.checked) {
                                setTotalSelected(prev => prev + 1);
                            }
                            else {
                                setTotalSelected(prev => prev - 1);
                            }
                            onSelectRemove((prev: selectTags) => {
                                return {
                                    ...prev,
                                    [contact.id]: e.target.checked
                                }
                            })
                        }}
                    />
                </div>
                <div className="profile">
                    <img className="image" src={contact.img ? contact.img : "https://th.bing.com/th/id/R.e62421c9ba5aeb764163aaccd64a9583?rik=iF1lsPZqz0lstQ&pid=ImgRaw&r=0"} alt="user_image" />
                    <div className="description">
                        <p className="name">{contact.name}</p>
                        <p className="phone">{contact.phoneNumber}</p>
                    </div>
                </div>
            </div>
            
            <div className="right">
                <div className="tags">
                    {
                        contact.tags.map(tag => {
                            return (
                                <div key={tag.name} className="tag">
                                    {tag.name}
                                    <ClearIcon />
                                </div>
                            )
                        })
                    }
                    <div className="add-new">
                        <AddIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePerson;