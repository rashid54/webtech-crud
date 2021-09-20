import React, { useState } from "react";



export const BookContext = React.createContext();
export const AuthorContext = React.createContext();

function GlobalContext({children}){
    const [allBooks, setAllBooks] = useState();
    const [allAuthors, setAllAuthors] = useState();

    return (
        <BookContext.Provider value={[allBooks, setAllBooks]}>
            <AuthorContext.Provider value={[allAuthors, setAllAuthors]} >
                {children}
            </AuthorContext.Provider>
        </BookContext.Provider>
    )
}

export default GlobalContext;