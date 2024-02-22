import React from "react";
import './../../styles/dashboard-page/tables.css'
export default function FilterDropdown({options, onSelect}){
    const uniqueOptions = [...new Set(options)]; // Remove duplicates
    return(
        <>
            <div className='filter-dropdown'>
                {uniqueOptions.map((option) => (
                <div
                key={option}
                onClick={() => onSelect(option)}
                className='filter-option'
                >
                <div>
                    <span>{option}</span>
                </div>
                </div>
            ))}
            </div>
        </>
    )
    
}