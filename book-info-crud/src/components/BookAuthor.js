import React, { useState } from "react";
import Navbar from "./Navbar";
import DataTable from "./DataTable";
const axios = require('axios').default

function BookAuthor(){
    const allData = {
        names: ["id", "title", "price", "publishedIn"],
        headings: ["ID", "Title", "Price", "Published in",],
        dataRows: [
            [3,"Digital Fortress", "56", "2011",],
            [4,"Book 3", "39", "2042",],
        ],
        onDelete: (id)=> true,
        onUpdate: (id,data)=> true,
        onCreate: (data)=> true,
    }

    axios.get('http://localhost:8000/api/author')
        .then((response)=>{
            const responseData = response.data;
            if (response.status===200 && responseData[0]){
                console.log(responseData);
            }
        })
        .catch((error)=>{
            console.log(error);
        })

    return (
        <div className="home bg-gray-100">
            <Navbar />
            <DataTable allData={allData}/>


        </div>
    )
}

export default BookAuthor;