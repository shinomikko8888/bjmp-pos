import React from "react";
export default function InventorySection(){
    
    return(
    <>
        <div className='row d-flex align-items-center mt-5'>
            <div className='col-11 d-flex align-items-center'>
                <i className='fa-solid fa-warehouse'></i>
                <h6 className="fw-bold fs-5 m-0 mx-3">Inventory Overview</h6>
            </div>
        </div>
      <hr></hr>
      <div className='row'>
        <div className='col-6'>
          Profit
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