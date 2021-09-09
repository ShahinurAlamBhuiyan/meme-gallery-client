import React, { useEffect, useState } from 'react';
import './InputForm.css';
import axios from 'axios';

export const InputForm = ({ uploadMeme }) => {
    const [imageLink, setImageLink] = useState()
    const [memeInfo, setMemeInfo] = useState({
        uploadedDate: new Date(),
        imageUrl: null
    });

    // Upload image in imgBB.com
    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '01f404fedbbf2ae136a5058ee4ac6d25');
        imageData.append('image', event.target.files[0]);
        if (!memeInfo.imageUrl) {
            axios.post('https://api.imgbb.com/1/upload',
                imageData)
                .then(function (response) {
                    // setMemeInfo({ ...memeInfo, imageUrl: response.data.data.display_url })
                    setImageLink(response.data.data.display_url)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert('something wrong, Please refresh the page!')
        }
    }

    // Take input Link
    const handleUserLink = (e) => {
        if (!memeInfo.imageUrl) {
            setImageLink(e.target.value)
        } else {
            alert('something wrong, Please refresh the page!')
        }
    }

    // Submit to the state
    const handleSubmit = (e) => {
        if (imageLink) {
            setMemeInfo({ ...memeInfo, imageUrl: imageLink })
        }
        e.preventDefault();
    }

    // upload image data to the db
    useEffect(() => {
        if (memeInfo.imageUrl) {
            uploadMeme(memeInfo);
            setImageLink(null)
            setMemeInfo({})
        }
    }, [memeInfo.imageUrl])


    return (
        <form onSubmit={handleSubmit}>
            <div className="inputContainer">
                <input onChange={handleUserLink} type="text" name="imageUrl" />
                <p>or</p>
                <input type="file" onChange={handleImageUpload} className="custom-file-input" />
            </div>
            <button className="submitBtn" type="submit" disabled={!imageLink && "true"} >Submit</button>
        </form>
    )
}