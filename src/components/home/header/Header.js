import React, { useEffect, useState } from 'react';
import './Header.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Header = ({ uploadMeme }) => {
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
                    setMemeInfo({ ...memeInfo, imageUrl: response.data.data.display_url })
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
        setMemeInfo({ ...memeInfo, imageUrl: imageLink })
        e.preventDefault();
    }

    useEffect(() => {
        if (memeInfo.imageUrl) {
            uploadMeme(memeInfo);
            setMemeInfo({});
        }
    }, [memeInfo.imageUrl])

    console.log(memeInfo);
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Meme Gallery</h1>
            <div className="navContainer">
               <Link to="/"> <button>Home</button></Link>
               <Link to="/stats"> <button>stats</button></Link>
                
            </div>
            <div className="image-form-container">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleUserLink} type="text" name="imageUrl" />
                    <button type="submit">Submit</button>
                </form>
                <input type="file" onChange={handleImageUpload} id="add-meme" />
            </div>
        </>
    )
}