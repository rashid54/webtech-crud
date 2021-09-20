import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BooksDataTable from "./BooksDataTable";
const axios = require('axios').default

function Reviews(){
    const [allData, setAllData] = useState(
        {
            names: ["id", "description", "rating", "book"],
            headings: ["ID", "Description", "Rating", "Book",],
            dataRows: [],
            authorsName: [],
            authorsId: [],
            onDelete: deleteData,
            onUpdate: patchData,
            onCreate: postData,
        }
    )
    const baseUrl = 'http://localhost:8000/api/allbook/review/';
    const subUrl = 'http://localhost:8000/api/allbook/book/' ;

    console.log(allData);

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
                newdata.authorsName = allAuthors.reduce((accu,curr)=>([...accu,curr.title]),[]);
                newdata.authorsId = allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]);
            }

            setAllData(newdata);
        })
    
    },[ ])

    function postData(val){
        const url = baseUrl;
        axios.post(url, val)
            .then((response)=>{
                if(response.status === 201){
                    return Promise.all([axios.get(baseUrl),axios.get(subUrl)]);
                }

            })
            .then((results)=>{
                const allBooks = results[0].data
                const allAuthors = results[1].data

                const newdata= {...allData};

                if(allBooks[0]){
                    newdata.names = Object.keys(allBooks[0]);
                    newdata.dataRows = allBooks.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]);
                }
                if(allAuthors){
                    newdata.authorsName = allAuthors.reduce((accu,curr)=>([...accu,curr.title]),[]);
                    newdata.authorsId = allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]);
                }

                setAllData(newdata);
            })
            .catch((error)=>console.log(error))

    }

    function patchData(val, id){
        const url = `${baseUrl}${id}/`;
        axios.patch(url, val)
            .then((response)=>{
                if(response.status === 200){
                    return Promise.all([axios.get(baseUrl),axios.get(subUrl)]);
                }

            })
            .then((results)=>{
                const allBooks = results[0].data
                const allAuthors = results[1].data

                const newdata= {...allData};

                if(allBooks[0]){
                    newdata.names = Object.keys(allBooks[0]);
                    newdata.dataRows = allBooks.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]);
                }
                if(allAuthors){
                    newdata.authorsName = allAuthors.reduce((accu,curr)=>([...accu,curr.title]),[]);
                    newdata.authorsId = allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]);
                }

                setAllData(newdata);
            })
            .catch((error)=>console.log(error))
    }

    function deleteData(id){
        const url = `${baseUrl}${id}/`;
        axios.delete(url)
            .then((response)=>{
                if(response.status === 204){
                    return Promise.all([axios.get(baseUrl),axios.get(subUrl)]);
                }

            })
            .then((results)=>{
                const allBooks = results[0].data
                const allAuthors = results[1].data

                const newdata= {...allData};

                if(allBooks[0]){
                    newdata.names = Object.keys(allBooks[0]);
                    newdata.dataRows = allBooks.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]);
                }
                if(allAuthors){
                    newdata.authorsName = allAuthors.reduce((accu,curr)=>([...accu,curr.title]),[]);
                    newdata.authorsId = allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]);
                }

                setAllData(newdata);
            })
            .catch((error)=>console.log(error))
    }

    return (
        <div className="home bg-gray-100">
            <Navbar />
            <BooksDataTable allData={allData}/>


        </div>
    )
}

export default Reviews;