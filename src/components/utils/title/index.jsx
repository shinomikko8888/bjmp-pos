import React from "react";

export default function SectionTitle(props){
    const {title, icon} = props
    return (
        <>
            <div className='col-12 d-flex align-items-center'>
                <i className={icon}></i>
                <h6 className="fw-bold fs-5 m-0 mx-3">{title}</h6>
            </div>
        </>
    )
}