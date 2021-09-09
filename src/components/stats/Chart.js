import React, { useEffect, useState } from "react";
import './Chart.css';
import axios from "axios";
import {
  BarChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  YAxis,
  Bar,
  ResponsiveContainer
} from "recharts";

export default function Chart() {
  const [memesInfo, setMemesInfo] = useState([]);
  const [memeInfo, setMemeInfo] = useState([]);

  const finalArray = [
    { id: 1, day: "Sunday", imageUpload: 0 },
    { id: 2, day: "Monday", imageUpload: 0 },
    { id: 3, day: "Tuesday", imageUpload: 0 },
    { id: 4, day: "Wednesday", imageUpload: 0 },
    { id: 5, day: "Thursday", imageUpload: 0 },
    { id: 6, day: "Friday", imageUpload: 0 },
    { id: 7, day: "Saturday", imageUpload: 0 },
  ]

  // get last 7 days data from api...
  const getMemes = () => {
    axios.get('http://localhost:5000/recentMemes')
      .then(function (response) {
        setMemesInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    getMemes()
  }, [memesInfo.length]);



  // converting date to name...
  useEffect(() => {
    const newArray = memesInfo.map(function (x) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const convertedName = (days[(new Date(x.uploadedDate)).getDay()])
      x.uploadedDate = (convertedName.toString());
      return x
    });
    setMemeInfo(newArray)
  }, [memesInfo.length])


  // take uploaded img number from each day length...
  if (memeInfo.length) {
    const sundayUpload = memeInfo.filter((item) => item.uploadedDate === "Sunday")
    const objIndex1 = finalArray.findIndex((obj) => obj.id === 1)
    finalArray[objIndex1].imageUpload = sundayUpload.length;

    const mondayUpload = memeInfo.filter((item) => item.uploadedDate === "Monday")
    const objIndex2 = finalArray.findIndex((obj) => obj.id === 2)
    finalArray[objIndex2].imageUpload = mondayUpload.length;

    const tuesdayUpload = memeInfo.filter((item) => item.uploadedDate === "Tuesday")
    const objIndex3 = finalArray.findIndex((obj) => obj.id === 3)
    finalArray[objIndex3].imageUpload = tuesdayUpload.length;

    const wednesdayUpload = memeInfo.filter((item) => item.uploadedDate === "Wednesday")
    const objIndex4 = finalArray.findIndex((obj) => obj.id === 4)
    finalArray[objIndex4].imageUpload = wednesdayUpload.length;

    const thursdayUpload = memeInfo.filter((item) => item.uploadedDate === "Thursday")
    const objIndex5 = finalArray.findIndex((obj) => obj.id === 5)
    finalArray[objIndex5].imageUpload = thursdayUpload.length;

    const fridayUpload = memeInfo.filter((item) => item.uploadedDate === "Friday")
    const objIndex6 = finalArray.findIndex((obj) => obj.id === 6)
    finalArray[objIndex6].imageUpload = fridayUpload.length;

    const saturdayUpload = memeInfo.filter((item) => item.uploadedDate === "Saturday")
    const objIndex7 = finalArray.findIndex((obj) => obj.id === 7)
    finalArray[objIndex7].imageUpload = saturdayUpload.length;
  }

  return (
    <div className="chartContainer">
      <h2>Memes uploaded per day</h2>
      <p>Last 7 days record</p>
      
      <BarChart
        width={700}
        height={300}
        data={finalArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="imageUpload" fill="#8884d8" />
      </BarChart>
      
    </div>
  );
}
