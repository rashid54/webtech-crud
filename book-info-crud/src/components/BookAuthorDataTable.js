import React, { useEffect, useState } from "react";
const axios = require('axios').default;

function BooksDataTable({allData:{names,headings,dataRows,onCreate,onDelete,onUpdate,authorsName,authorsId}}){
    const subrow = 3;
    const [formData, setFormData] = useState(()=>names.reduce((obj,curr,idx)=>({...obj, [curr]:(((idx===subrow)&&authorsId[0])||'')}),{}));
    const [editingRow, setEditingRow] = useState(-1);

    console.log(formData);
    console.log(authorsId);

    function handleOnChange(e){
        if(e.target.name!=='id'){
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }
    
    function handleEditingMode(rowId){
        setEditingRow(rowId);
        setFormData(()=>names.reduce((obj,curr,idx)=>({...obj, [curr]:dataRows[rowId][idx]}),{}));
    }

    function handleDelete(rowId){
        onDelete(dataRows[rowId][0]);
        setEditingRow(-1);
        setFormData(()=>names.reduce((obj,curr,idx)=>({...obj, [curr]:(idx===subrow)?authorsId[0]:''}),{}));
    }

    function handleUpdate(e){
        onUpdate(formData,formData.id);
        setEditingRow(-1);
        setFormData(()=>names.reduce((obj,curr,idx)=>({...obj, [curr]:(idx===subrow)?authorsId[0]:''}),{}));
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
                        {headings.map((heading)=><th key={heading}>{heading}</th>)}
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (editingRow===-1)?(<tr className="text-center" >
                        {
                            headings.map((heading, idx)=>{
                                if(idx===subrow){
                                    return (
                                        <select key={idx} name={names[subrow]} value={formData[names[idx]]} onChange={handleOnChange}>
                                            <option value=""> Select</option> 
                                            {authorsName.map((val,idx)=>(<option key={val} value={authorsId[idx]}>{val}</option>))}
                                        </select>
                                    )
                                }
                                return <td key={idx} ><input type="text" placeholder={heading} onChange={handleOnChange} name={names[idx]} value={idx===0?"auto":formData[names[idx]]}/> </td> 
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
                                <tr key={dataRow[0]} className="text-center" >
                                    {
                                        headings.map((heading, idx)=>{
                                            if(idx===subrow){
                                                return (
                                                    <select key={idx} name={names[subrow]} value={formData[names[idx]]} onChange={handleOnChange}>
                                                        {authorsName.map((val,idx)=>(<option key={val} value={authorsId[idx]}>{val}</option>))}
                                                    </select>
                                                )
                                            }
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
                                            <td className='break-words' key={idx}>{(idx===subrow)?authorsName[authorsId.findIndex((id)=>(id===val))]:val}</td>
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