import React from "react";
import { DOMAIN } from "../../../../constants";

export default function PDLGeneralProfile(props) {
    const {data, imageSrc} = props
    
    return (
        <>
            <div className="profile-container profile-card p-4">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <div className="overflow-auto">
                            {
                                imageSrc ? (<>
                                <img
                                    className="rounded-circle my-3 overflow-auto"
                                    src={`${DOMAIN}/files/images/pdls/${imageSrc}`}
                                    width={212}
                                />
                                </>)
                                : (<>
                                <svg xmlns="http://www.w3.org/2000/svg" className='' style={{margin: '0', padding: '0'}} width="203" height="203" viewBox={`"0 0 202 202"`} fill="none">
                                    <rect x="0.5" y="0.5" width="202" height="202" rx="41" fill="white" stroke="#9D9D9D"
                                    strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
                                </svg>
                                </>)
                            }
                        </div>
                        <h5 className="fw-bold mt-2 mb-0">
                            {data['pdl-last-name'] ? (data['pdl-last-name'] ? 
                                (`${(data['pdl-last-name']).toUpperCase()}`) : data['pdl-last-name']) : 'XXXXXXXXX'}, 
                            {data['pdl-first-name'] ? ` ${data['pdl-first-name']}` : ' XXXXXX'} 
                            {data['pdl-middle-name'] ? ` ${data['pdl-middle-name']}` : ' XXXXXXX'}
                            </h5>
                            <label className="text-muted p-0 m-0">
                            PDL-{data['pdl-id'] ? data['pdl-id'] : 'XXXXXX'}, 
                            Age: {data['pdl-age'] ? data['pdl-age'] : 'XX'}, 
                            Gender: {data['pdl-gender'] ? (data['pdl-gender'] === 'Other' ? data['pdl-other-gender'] : data['pdl-gender']) : 'XXXXXX'}
                        </label>
                        <div className="h4 mt-2 d-flex align-items-center justify-content-center">
                            <button className="mx-1 profile-button">
                                <i className='fa-solid fa-fingerprint icon-hover'></i>
                                <span className='icon-tooltip'>Scan Fingerprint</span>
                            </button>
                            <button className="mx-1 profile-button">
                                <i className='fa-solid fa-print icon-hover'></i>
                                <span className='icon-tooltip'>Print Data</span>
                            </button>
                           
                        </div>
                    </div>
                   
                </div>
            </div>
            
        </>
    )
}