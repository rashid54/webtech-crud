import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DataTable from "./DataTable";
const axios = require('axios').default

function Authors(){
    const [allData, setAllData] = useState({
        names: [],
        headings: ["ID", "Name", "Description", ],
        dataRows: [],
        onDelete: deleteData,
        onUpdate: patchData,
        onCreate: postData,
    })

    useEffect(() => {
      getData();
    },[])

    function getData(){
        axios.get('http://localhost:8000/api/author/')
        .then((response)=>{
            const responseData = response.data;
            if (response.status===200 && responseData[0]){
                setAllData({...allData,
                    names: Object.keys(responseData[0]),
                    dataRows: responseData.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]),
                })
            }
        })
        .catch((error)=>{
            console.log(error);
        });
        console.log("Finished request to get author list");
    }

    function postData(val){
        const url = 'http://localhost:8000/api/author/';
        axios.post(url, val)
            .then((response)=>{
                if(response.status === 201){
                    return axios.get('http://localhost:8000/api/author/');
                }

            })
            .then((response)=>{
                const responseData = response.data;
                if (response.status===200 && responseData[0]){
                    allData.names = Object.keys(responseData[0]);
                    allData.dataRows = responseData.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]);

                    setAllData({...allData,
                        names: Object.keys(responseData[0]),
                        dataRows: responseData.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]),
                    })
                }
            })
            .catch((error)=>console.log(error))

    }

    function patchData(val, id){
        const url = `http://localhost:8000/api/author/${id}/`;
        axios.patch(url, val)
            .then((response)=>{
                if(response.status === 200){
                    return axios.get('http://localhost:8000/api/author/');
                }

            })
            .then((response)=>{
                const responseData = response.data;
                if (response.status===200 && responseData[0]){
                    allData.names = Object.keys(responseData[0]);
                    allData.dataRows = responseData.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]);

                    setAllData({...allData,
                        names: Object.keys(responseData[0]),
                        dataRows: responseData.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]),
                    })
                }
            })
            .catch((error)=>console.log(error))
    }

    function deleteData(id){
        const url = `http://localhost:8000/api/author/${id}/`;
        axios.delete(url)
            .then((response)=>{
                if(response.status === 204){
                    return axios.get('http://localhost:8000/api/author/');
                }

            })
            .then((response)=>{
                const responseData = response.data;
                if (response.status===200 && responseData[0]){
                    allData.names = Object.keys(responseData[0]);
                    allData.dataRows = responseData.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]);

                    setAllData({...allData,
                        names: Object.keys(responseData[0]),
                        dataRows: responseData.reduce((arr,curr)=>([...arr, Object.values(curr)]),[]),
                    })
                }
            })
            .catch((error)=>console.log(error))
    }

    return (
        <div className="bg-gray-100">
            <Navbar />
            <DataTable allData={allData}/>


        </div>
    )
}

export default Authors;