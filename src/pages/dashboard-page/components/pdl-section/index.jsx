import React from "react";
import { VulnerableRatio } from "./components";
import { SectionTitle } from "../../../../components";
export default function PDLSection(){
    
    
    return(
    <>
        <div className='row d-flex align-items-center mt-5'>
            <SectionTitle title="PDL Overview" icon="fa-solid fa-handcuffs"/>
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