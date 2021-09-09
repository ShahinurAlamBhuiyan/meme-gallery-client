import axios from 'axios'
import React from 'react'
import { InputForm } from '../components/home/InputForm/InputForm'
import MemesContainer from '../components/home/memesContainer/MemesContainer'
import { Navbar } from '../components/shared/Navbar'

export const Home = () => {
// http://localhost:5000/
// https://frozen-scrubland-68019.herokuapp.com/
    const uploadMeme = (memeInfo) => {
        axios.post('http://localhost:5000/addMeme', memeInfo)
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
            <Navbar />
            <InputForm uploadMeme={uploadMeme} />
            <MemesContainer />
        </>
    )
}
