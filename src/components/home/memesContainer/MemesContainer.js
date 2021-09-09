import React, { useEffect, useState } from 'react';
import './MemesContainer.css';
import axios from 'axios';
import SingleMeme from '../singleMeme/SingleMeme';
import { CircularProgress } from '@material-ui/core';


const MemesContainer = () => {

    const [memesInfo, setMemeInfo] = useState([]);

    const getMemes = () => {
        axios.get('https://frozen-scrubland-68019.herokuapp.com/allMemes')
            .then(function (response) {
                setMemeInfo(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        getMemes()
    }, [memesInfo]);

    const deleteMeme = (id) => {
        axios.delete(`https://frozen-scrubland-68019.herokuapp.com/deleteMeme/${id}`)
            .then(
                alert('deleted success')
            )
    }

    return (
        <>

            {memesInfo.length ? <div className="gallery">
                {memesInfo.map((meme) => <SingleMeme meme={meme} key={meme._id} deleteMeme={deleteMeme} />)

                }
            </div>
                :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '130px' }}>
                    <CircularProgress />
                </div>
            }
        </>
    )
}

export default MemesContainer
