import React from "react";

export default function PDLSelector(props){
    const {type} = props
    return(
        <>
            <div className={`col${type === 'general' ? '-12' : ''} mb-3`}>
                {   type === 'general' ?
                    (<label htmlFor="pdl-information" className="col-form-label">Selected PDL:</label>)
                    :
                    (<h6 className="fw-bold text-center mb-3">{type.charAt(0).toUpperCase() + type.slice(1)} Balance</h6>)
                }
                <div className="pdl-selector">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className='' style={{margin: '0', padding: '0'}} width="163" height="163" viewBox={`"0 0 162 162"`} fill="none">
                            <rect x="0.5" y="0.5" width="162" height="162" rx="41" fill="white" stroke="#9D9D9D"
                            strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
                        </svg>
                        <h4 className="fw-bold mt-2 mb-0">XXXXXXXXXXXXX</h4>
                        <label className="text-muted p-0 m-0">PDL-XXXXXX</label>
                        <hr></hr>
                        <h6 className="fw-bold mt-2 mb-0">₱XX.XX</h6>
                        <label className="text-muted p-0 m-0">Balance</label>
                    </div>
                </div>
            </div>
        </>
    )

}