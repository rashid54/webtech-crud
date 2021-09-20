import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DataTable from "./DataTable";
import BooksDataTable from "./BooksDataTable";
const axios = require('axios').default

function Books(){
    const [allData, setAllData] = useState(
        {
            names: ["id", "title", "price", "author"],
            headings: ["ID", "Title", "Price", "Author",],
            dataRows: [],
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
                authorsName: allAuthors.reduce((accu,curr)=>([...accu,curr.name]),[]),
                authorsId: allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]),
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