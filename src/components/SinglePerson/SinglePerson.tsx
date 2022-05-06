import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

import CheckBoxGlobal from "../CheckBoxGlobal/CheckBoxGlobal";
import "./static/style.scss";

function SinglePerson() {

    return (
        <div className='card-container'>
            <div style={{borderBottom: "1px #F3F5F9"}} className="left">
                <div className="checkbox">
                    <CheckBoxGlobal
                        checked={false}
                        onChange={() => {}}
                    />
                </div>
                <div className="profile">
                    <img className="image" src="https://th.bing.com/th/id/R.e62421c9ba5aeb764163aaccd64a9583?rik=iF1lsPZqz0lstQ&pid=ImgRaw&r=0" />
                    <div className="description">
                        <p className="name">Name e</p>
                        <p className="phone">+88015565645</p>
                    </div>
                </div>
            </div>
            
            <div className="right">
                <div className="tags">
                    <div className="tag">
                        tag
                        <ClearIcon />
                    </div>
                    <div className="add-new">
                        <AddIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePerson;