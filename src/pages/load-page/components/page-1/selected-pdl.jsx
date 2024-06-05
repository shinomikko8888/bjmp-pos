import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../../../constants";

export default function PDLSelector(props){
    const {type, pdlData, loadAmount} = props
    const [updatedBalance, setUpdatedBalance] = useState('');
    useEffect(() => {
        if (loadAmount !== undefined && pdlData['pdl-balance'] !== undefined) {
            let newBalance;
            if (!isNaN(loadAmount) && parseFloat(loadAmount) > 0) {
                newBalance = (parseFloat(pdlData['pdl-balance']) + parseFloat(loadAmount)).toFixed(2);
            } else {
                newBalance = pdlData['pdl-balance'];
            }
            setUpdatedBalance(newBalance);
        }
    }, [loadAmount, pdlData]);
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
                        {
                            pdlData['pdl-image'] ? (
                                <>
                                    <img
                                        className="rounded-circle overflow-auto"
                                        src={`${DOMAIN}/files/images/pdls/${pdlData['pdl-image']}`}
                                        width={212}
                                    />
                                </>
                            ) :
                            (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='' style={{margin: '0', padding: '0'}} width="163" height="163" viewBox={`"0 0 162 162"`} fill="none">
                                        <rect x="0.5" y="0.5" width="162" height="162" rx="41" fill="white" stroke="#9D9D9D"
                                        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
                                    </svg>
                                </>
                            )
                        }
                        
                        <h4 className="fw-bold mt-2 mb-0">{pdlData['pdl-last-name'] ? (pdlData['pdl-last-name'] ? 
                                (`${(pdlData['pdl-last-name']).toUpperCase()}`) : pdlData['pdl-last-name']) : 'XXXXXXXXX'}, 
                            {pdlData['pdl-first-name'] ? ` ${pdlData['pdl-first-name']}` : ' XXXX'} 
                            {pdlData['pdl-middle-name'] ? ` ${pdlData['pdl-middle-name']}` : ' XXXXX'}</h4>
                        <label className="text-muted p-0 m-0">PDL-{pdlData['pdl-id'] ? pdlData['pdl-id'] : 'XXXXXX'}, </label>
                        <hr></hr>
                        <h6 className="fw-bold mt-2 mb-0">₱{updatedBalance !== '' ? updatedBalance : pdlData['pdl-balance'] ? pdlData['pdl-balance'] : 'XX.XX'}</h6>
                        <label className="text-muted p-0 m-0">Balance</label>
                    </div>
                </div>
            </div>
        </>
    )

}