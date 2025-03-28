import React from "react";
import { HighestSpender, LowBalance, VulnerableRatio } from "./components";
import { SectionTitle } from "../../../../components";
export default function PDLSection(props){
    const {data} = props
    
    return(
    <>
        <div className='row d-flex align-items-center mt-5'>
            <SectionTitle title="PDL Overview" icon="fa-solid fa-handcuffs"/>
        </div>
      <hr></hr>
      <div>
        <div className='row'>
            <div className='col-3'>
            <LowBalance data={data.pdlsWithLowBalance}/>
            </div>
            <div className='col-3'>
            <HighestSpender data={data.highestSpenders}/>
            </div>
            <div className='col-6 '>
            <VulnerableRatio />
            </div>
         </div>
      </div>
    </>);

}