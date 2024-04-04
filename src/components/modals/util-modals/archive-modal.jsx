import React, {useState} from "react";
import '../../../styles/buttons/general.css';
import Modal from "..";
import { handleSubmitWrapper } from "../../../utils";

export default function ArchiveModal (props) {
    const {stateChecker, stateControl, type, method, id, isSubmittedControl, multipleIds} = props
    const archiveValue = {
      id: id || '',
      mult: multipleIds || '',
      method: method.toLowerCase() || '',
      action: `archive-${type.toLowerCase()}`
    }
    const handleSubmit = async (event) => {
        try{
          const response = await handleSubmitWrapper(event, archiveValue, true);
          if (response.success) {
              stateControl((prev) => !prev)
              isSubmittedControl((prev) => !prev)
          }
        } catch (error) {
          console.error('Error: ', error);
        }
    }

    const archiveHeader = (
        <div className='w-100 text-center'>
            <i className='fa-solid fa-box-archive' style={{ fontSize: '40px' }}></i>
        </div> 
    )
    
    const archiveBody = (
        <div className='text-center'>
            <h3>Confirm Archiving?</h3>
            <p>Are you sure you want to archive {
                method === 'Single' ?
                `this ${type}` :
                `these ${type}s`
            }?</p>
        </div>
    )

    const archiveFooter = (
        <div className='d-flex align-items-center justify-content-end'>
          <button
            type="button"
            className='link-btn mx-2'
            onClick={() => stateControl((prev) => !prev)}
          >
            Cancel
          </button>
          <button
            type="button"
            className='main-btn'
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
      );

      return <Modal headerContent={archiveHeader} 
      bodyContent={archiveBody} 
      footerContent={archiveFooter} 
      stateChecker={stateChecker} 
      stateControl={stateControl}
      customWidth={'25%'}
      customZIndex={20}/>;
}