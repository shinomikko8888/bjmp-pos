import React from "react";
import { ProfitOverview } from "./components";
import { SectionTitle } from "../../../../components";
export default function InventorySection(){
    
    return(
    <>
        <div className='row d-flex align-items-center mt-5'>
          <SectionTitle title="Inventory Overview" icon="fa-solid fa-warehouse"/>
        </div>
      <hr></hr>
      <div className='row'>
        <div className='col-6'>
          <ProfitOverview />
        </div>
        <div className='col-3'>
          Popular Items
        </div>
        <div className='col-3'>
          Low Item Count
        </div>
      </div>
    </>);

}