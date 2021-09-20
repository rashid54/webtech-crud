import React from 'react';
import DataTable from './DataTable';
import Navbar from './Navbar';


function Home(){
    const dataList = {
        names: ["teamName","teamFloor","teamRoom","memberCount","isActive"],
        headings: ["Team Name","Team floor","Team room","Member Count","Is Active"],
        dataRows: [
            ["team1", "2nd", "54",null,true],
            ["team3", "5nd", "42",null,true],
        ]
    }
    return (
        <div className="home bg-gray-100">
            <Navbar />
            <DataTable allData={dataList}/>
        </div>

    );
}

export default Home;