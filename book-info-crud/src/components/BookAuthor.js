import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BookAuthorDataTable from "./BookAuthorDataTable";
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
            onUpdate: patchData,
            onCreate: postData,
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

    function postData(val){
        const subval = {
            name: val['author'],
            description: "none",
        }
        axios.post(subUrl,subval)
            .then((response)=>{
                if(response.status === 201){
                    return axios.post(baseUrl, {...val, author: response.data.id})
                }
            })
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
                    newdata.authorsName = allAuthors.reduce((accu,curr)=>([...accu,curr.name]),[]);
                    newdata.authorsId = allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]);
                }
    
                setAllData(newdata);
            })
            .catch((error)=>console.log(error))

    }

    function patchData(val, id){
        const url = `${baseUrl}${id}/`;
        const {author, ...payload} = val;
        axios.patch(url, payload)
            .then((response)=>{
                if(response.status === 200){
                    const subPathchUrl = `${subUrl}${response.data.author}/`;
                    return axios.patch(
                        subPathchUrl, 
                        {
                            name: (response.data.author==author)?allData.authorsName[allData.authorsId.findIndex((id)=>id==author)]:author,
                        }
                    )
                }
            })
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
                    newdata.authorsName = allAuthors.reduce((accu,curr)=>([...accu,curr.name]),[]);
                    newdata.authorsId = allAuthors.reduce((accu,curr)=>([...accu,curr.id]),[]);
                }
    
                setAllData(newdata);
            })
            .catch((error)=>console.log(error))
    }

    return (
        <div className="home bg-gray-100">
            <Navbar />
            <BookAuthorDataTable allData={allData}/>


        </div>
    )
}

export default BookAuthor;