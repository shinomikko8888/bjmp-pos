import React, {useEffect, useState} from "react";
import '../../../styles/buttons/general.css';
import Modal from "..";
import { handleChangeWrapper, handleSubmitWrapper } from "../../../utils";
import { REASONS } from "../../../constants/reasons";

export default function ArchiveModal (props) {
    const {stateChecker, stateControl, type, method, id, isSubmittedControl, multipleIds} = props
    const [archiveValue, setArchiveValue] = useState({
      id: '',
      mult: '',
      method: '',
      action: '',
      reason: '',
      user: '',
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonState, setButtonState] = useState(false);
    const filteredReasons = REASONS.filter(branch => branch.action === 'Archive')[0]?.content.filter(contentItem => contentItem.type === type)[0]?.reasons || [];
    useEffect(() => {
      setArchiveValue(
        {
          ...archiveValue,
          reason: '',
        }
      )
    }, [stateChecker]);
    useEffect(() => {
      setArchiveValue({
        ...archiveValue,
        id: id && id,
        mult: multipleIds && multipleIds ,
        method: method && method.toLowerCase(),
        action: type && `archive-${type.toLowerCase()}`,
        user: localStorage.getItem('user-email'),
      })
    }, [type, method, id] )
    const handleChange = async (event) => {
      await handleChangeWrapper(event, archiveValue, setArchiveValue);
    };
    
    const handleSubmit = async (event) => {
        if(archiveValue.reason === '')
          setErrorMessage('Please set a reason for archiving!');
        else{
          setErrorMessage('');
          setButtonState(true);
          try{
            const response = await handleSubmitWrapper(event, archiveValue, true);
            if (response.success) {
                stateControl((prev) => !prev)
                isSubmittedControl((prev) => !prev)
                setButtonState(false);
            } else {
                setButtonState(false);
            }
          } catch (error) {
            console.error('Error: ', error);
            setButtonState(false);
          }
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
            <select
                name="reason"
                id="reason"
                style={{ width: '100%', boxShadow: 'none' }}
                onChange={handleChange}
                value={archiveValue.reason || ''}
                className="form-select"
            >
                <option value="" disabled hidden>--Select Reason--</option>
                {filteredReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                ))}
            </select>
        </div>
    )
   

    const archiveFooter = (
        <div className='d-flex align-items-center justify-content-end'>
          <p className="error-message">{errorMessage}</p>
          <button
            type="button"
            className='link-btn mx-2'
            onClick={() => stateControl((prev) => !prev)}
            disabled={buttonState}
          >
            Cancel
          </button>
          <button
            type="button"
            className='main-btn'
            onClick={handleSubmit}
            disabled={buttonState}
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
      customWidth={'30%'}
      customZIndex={20}/>;
}