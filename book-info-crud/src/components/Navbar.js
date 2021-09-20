import React from 'react';
import {Link } from 'react-router-dom'


function Navbar(){
    return (
        <div className="bg-gray-400 p-4 flex items-baseline">
            <h2 className="text-4xl mx-4 my-2 font-bold"> Book Info CRUD</h2>
            <div className="flex flex-wrap">
                <Link className="text-lg font-semibold mx-2 my-1 bg-gray-500 px-1 rounded" to="/">User List</Link>
                <Link className="text-lg font-semibold mx-2 my-1 bg-gray-500 px-1 rounded" to="/books">Book List</Link>
                <Link className="text-lg font-semibold mx-2 my-1 bg-gray-500 px-1 rounded" to="/authors">Author List</Link>
                <Link className="text-lg font-semibold mx-2 my-1 bg-gray-500 px-1 rounded" to="/reviews">Review List</Link>
                <Link className="text-lg font-semibold mx-2 my-1 bg-gray-500 px-1 rounded" to="/book-author">Book-Author List</Link>
            </div>
        </div>
    );
}

export default Navbar;