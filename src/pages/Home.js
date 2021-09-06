import axios from 'axios'
import React from 'react'
import { Header } from '../components/home/header/Header'
import MemesContainer from '../components/home/memesContainer/MemesContainer'

export const Home = () => {

    const uploadMeme = (memeInfo) => {
        axios.post('https://frozen-scrubland-68019.herokuapp.com/addMeme', memeInfo)
            .then(function (response) {
                console.log(response);
                alert('memes upload successfully');
            })
            .catch(function (error) {
                console.log(error);
                alert('data not uploaded');
            });
    }



    return (
        <>
            <Header uploadMeme={uploadMeme} />
            <MemesContainer />
        </>
    )
}
