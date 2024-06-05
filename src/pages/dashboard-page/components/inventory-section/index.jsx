import React from "react";
import { LowStocked, PopularItems, ProfitOverview } from "./components";
import { SectionTitle } from "../../../../components";
export default function InventorySection(props){
    return(
    <>
        <div className='row d-flex align-items-center mt-5'>
          <SectionTitle title="Inventory Overview" icon="fa-solid fa-warehouse"/>
        </div>
      <hr></hr>
      <div className='row'>
        <div className='col-6'>
          <ProfitOverview/>
        </div>
        <div className='col-3'>
          <PopularItems />
        </div>
        <div className='col-3'>
          <LowStocked />
        </div>
      </div>
      <div className="row">
      
      </div>
    </>);

}