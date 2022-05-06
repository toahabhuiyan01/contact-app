import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { selectTags, tag, tag as TG, tags } from '../../utils/interfaces';
import './static/style.scss';
import { brandColor } from '../../utils/GlobalConstants';

const TagTable: React.FC<tags | any> = ({tags, selectedTags, cbSelect}: tags) => {
  return (
    <div className="table-container-main">
        <div className="table-container">
            {
                tags?.map( (tag: tag, idx: number) => {
                    return (
                        <div key={idx} className='table-data'>
                            <div onClick={() => {
                                cbSelect((prev: selectTags) => {
                                    return {
                                        ...prev,
                                        [tag.name]: true
                                    }
                                })
                            }} title='Select' className="tag-name">
                                {tag.name}
                            </div>
                            {
                                selectedTags?.[tag.name] &&
                                <div className="action-block">
                                    <DeleteIcon 
                                        titleAccess='Remove' 
                                        onClick={() => {
                                            cbSelect((prev: selectTags) => {
                                                return {
                                                    ...prev,
                                                    [tag.name]: false
                                                }
                                            })
                                        }} 
                                        style={{color: "red"}} 
                                    />
                                    <CheckCircleIcon style={{color: brandColor}} />
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TagTable