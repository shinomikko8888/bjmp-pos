import React from "react";
import '../../../../../../styles/dashboard-page/cards.css'
export default function ColoredCard({props}){
    return(
        <>
        {props.type === 'single' ? (
            <div className={`${props.color} p-4 text-start position-relative`}>
            {/* Move the dropdown and span to the top right */}
            <div className="position-absolute top-0 end-0 p-2">
              <select
                id="durationSelector"
                className="form-select form-select-sm"
              >
                <option value="All Time">All Time</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              {/* Move the span for the specified week to the top right */}
  
            </div>
  
            <i className={props.icon}></i>
            <p className="fw-bold mt-3 h4">
              Nothing yet...
            </p>
            <p className="m-0" style={{fontSize: '14px'}}>{props.name}</p>
            
            <div className="mt-4">
              {/* Rest of the content */}
            </div>
          </div>
        ) : 
        (
            <div className={`${props.color} p-4 text-start position-relative`}>
            <i className={props.icon}></i>
            <div className='row mt-3 mb-2'>
              <div className='col'>
                  <p className="fw-bold m-0 h4">
                        {props.firstData}</p>
                  <p className="m-0" style={{ 
                    fontSize: '10px'
                    }}>{props.firstModifier}</p>
              </div>
              <div className='col'>
                  <div>
                    <p className="fw-bold m-0 h4">
                    {props.secondData}</p>
                    <p className="m-0" style={{ 
                      fontSize: '10px' }}>{props.secondModifier}</p>
                  </div>
                </div>
            </div>
            <p className="m-0" style={{fontSize: '14px'}}>{props.name}</p>
            
          </div>

        )

        }
        </>
    

    );

}