import React from "react";
import PosSelector from "./sections/pos-selector";
import { SearchBar } from "../../../components";
import PurchaseDetails from "./modals/purchase-details";

export default function PosTable(props) {

    return(
        <>
            <div className="table-container p-4">
                <div className="row">
                    <div className='col-4 d-flex align-items-center mb-3'>
                        <i className="fa-solid fa-cash-register"></i>
                        <h6 className='fw-bold fs-5 m-0 mx-2'>Point of Sales</h6>
                    </div>
                    <div className='col-8 d-flex align-items-center mb-3 justify-content-end'>
                        <SearchBar className="mx-2"/>
                        <select className="form-select mx-2"></select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <PosSelector/>
                    </div>
                </div>
            </div>
            
        </>

    )


}