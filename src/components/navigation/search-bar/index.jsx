import React from "react";

export default function SearchBar(props){
    return(
        <>
            <input className="search-bar form-control" type="text" placeholder="Enter search term"></input>
            <button className="search-button">
                <i className="fa-solid fa-search"></i>
            </button>
        </>
    )
}