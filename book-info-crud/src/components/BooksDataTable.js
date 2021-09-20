import React, { useState } from "react";
const axios = require('axios').default;

function BooksDataTable({allData:{names,headings,dataRows,onCreate,onDelete,onUpdate}}){
    const [formData, setFormData] = useState(()=>names.reduce((obj,curr)=>({...obj, [curr]:''}),{}));
    const [editingRow, setEditingRow] = useState(-1);

    function handleOnChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    function handleEditingMode(rowId){
        setEditingRow(rowId);
        setFormData(()=>names.reduce((obj,curr,idx)=>({...obj, [curr]:dataRows[rowId][idx]}),{}));
    }

    function handleDelete(rowId){
        onDelete(dataRows[rowId][0]);
        setEditingRow(-1);
        setFormData(()=>names.reduce((obj,curr)=>({...obj, [curr]:''}),{}));
    }

    function handleUpdate(e){
        onUpdate(formData,formData.id);
        setEditingRow(-1);
        setFormData(()=>names.reduce((obj,curr)=>({...obj, [curr]:''}),{}));
    }

    function handleCreate(e){
        onCreate(formData);
        setFormData(()=>names.reduce((obj,curr)=>({...obj, [curr]:''}),{}));
    }

    return (
        <form>
            <table className=" border-separate table-fixed w-full p-5 text-xs sm:text-base">
                <thead>
                    <tr className='bg-blue-100 ml-auto '>
                        {headings.map((heading)=><th>{heading}</th>)}
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (editingRow===-1)?(<tr className="text-center" >
                        {
                            headings.map((heading, idx)=>{
                                return <td key={idx} ><input type="text" placeholder={heading} onChange={handleOnChange} name={names[idx]} value={formData[names[idx]]}/> </td> 
                            })
                        }
                        <td>
                            <i onClick={handleCreate} className="fa fa-plus text-green-600 font-bold text-lg px-2 py-0 rounded-full bg-gray-300 mx-2"></i>
                        </td>  
                    </tr>):("")
                    }
                    
                    {
                        dataRows && dataRows.map((dataRow,rowId)=>{
                            return (editingRow===rowId)?(
                                <tr className="text-center" >
                                    {
                                        headings.map((heading, idx)=>{
                                            return <td key={idx} ><input type="text" placeholder={heading} onChange={handleOnChange} name={names[idx]} value={formData[names[idx]]}/> </td> 
                                        })
                                    }
                                    <td>
                                        <i onClick={handleUpdate} className="fa fa-save text-blue-600 font-bold text-lg px-2 py-0 rounded-full bg-gray-300 mx-2"></i>
                                    </td>  
                                </tr>
                            ):(
                                <tr className="text-center" key={dataRow[0]}>
                                    {dataRow.map((val,idx)=>{
                                        return (
                                            <td className='break-words' key={idx}>{val}</td>
                                        )
                                    })}
                                    <td>
                                        <i onClick={()=>handleEditingMode(rowId)} className="fa fa-edit text-blue-600 font-bold text-lg px-2 py-0 rounded-full bg-gray-300 mx-2"></i>
                                        <i onClick={()=>handleDelete(rowId)} className="fa fa-remove text-red-600 font-bold text-lg px-2 py-0 rounded-full bg-gray-300 mx-2"></i>
                                    </td>          
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </form>
    )
}

export default BooksDataTable;