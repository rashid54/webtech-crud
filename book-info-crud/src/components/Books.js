import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DataTable from "./DataTable";
import BooksDataTable from "./BooksDataTable";
const axios = require('axios').default

function Books(){
    const [allData, setAllData] = useState(
        {
            names: ["id", "title", "price", "publishedIn"],
            headings: ["ID", "Title", "Price", "Published in",],
            dataRows: [
                [3,"Digital Fortress", "56", "2011",],
                [4,"Book 3", "39", "2042",],
            ],
            authorsName: [],
            authorsId: [],
            onDelete: (id)=> true,
            onUpdate: (id,data)=> true,
            onCreate: (data)=> true,
        }
    )

    useEffect(()=>{
        Promise.all([axios.get('http://localhost:8000/api/book/'),axios.get('http://localhost:8000/api/author/')])
        .then((results)=>{
            const allBooks = results[0].data
            const allAuthors = results[1].data

            setAllData({...allData,
                names: Object.keys(allBooks[0]),
                dataRows: allBooks.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]),
            })
        })
    
    },[])

    return (
        <div className="home bg-gray-100">
            <Navbar />
            <BooksDataTable allData={allData}/>


        </div>
    )
}

export default Books;