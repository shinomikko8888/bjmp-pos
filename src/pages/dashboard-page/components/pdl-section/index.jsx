import React from "react";
import { VulnerableRatio } from "./components";
export default function PDLSection(){
    
    
    return(
    <>
        <div className='row d-flex align-items-center mt-5'>
            <div className='col-11 d-flex align-items-center'>
                <i className='fa-solid fa-handcuffs'></i>
                <h6 className="fw-bold fs-5 m-0 mx-3">PDL Overview</h6>
            </div>
        </div>
      <hr></hr>
      <div>
        <div className='row'>
            <div className='col-3'>
                Low Balance
            </div>
            <div className='col-3'>
                Highest Spender
            </div>
            <div className='col-6'>
                <VulnerableRatio />
            </div>
        </div>
      </div>
    </>);

}