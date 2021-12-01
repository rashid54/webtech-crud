import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DataTable from "./DataTable";
import BooksDataTable from "./BookAuthorDataTable";
const axios = require('axios').default

function BookAuthor(){
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

    const baseUrl = 'http://localhost:8000/api/allbook/book/';
    const subUrl = 'http://localhost:8000/api/author/' ;

    useEffect(()=>{
        Promise.all([axios.get(baseUrl),axios.get(subUrl)])
        .then((results)=>{
            const allBooks = results[0].data
            const allAuthors = results[1].data

            const newdata= {...allData};

            if(allBooks[0]){
                newdata.names = Object.keys(allBooks[0]);
                newdata.dataRows = allBooks.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]);
            }
            if(allAuthors){
                newdata.authorsName = allAuthors.reduce((accu,curr)=>([...accu,curr.name]),[]);
                newdata.authorsId = allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]);
            }

            setAllData(newdata);
        })
    
    },[])

    return (
        <div className="home bg-gray-100">
            <Navbar />
            <BooksDataTable allData={allData}/>


        </div>
    )
}

export default BookAuthor;