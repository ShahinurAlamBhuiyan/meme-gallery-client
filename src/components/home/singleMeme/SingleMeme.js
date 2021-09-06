import React, { useState } from 'react';
import './SingleMeme.css';

const SingleMeme = ({ meme: { _id, imageUrl }, deleteMeme }) => {

    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');

    const getImg = (image) => {
        setTempImgSrc(image);
        setModel(true);
    }

  

    return (
        <>
            <div className={model ? "model open" : "model"}>
                <img src={tempImgSrc} alt={tempImgSrc} />
                <div className="buttonContainer">
                    <button
                        className="deleteMeme"
                        onClick={() => deleteMeme(_id)} >
                        Delete
                    </button>
                    <button
                        className="closeModel"
                        onClick={() => setModel(false)}>
                        Close
                    </button>

                </div>
            </div>
                <img src={imageUrl} alt={_id} style={{ width: '100%' }}  className="meme" onClick={() => getImg(imageUrl)} />
        </>
    )
}

export default SingleMeme;
