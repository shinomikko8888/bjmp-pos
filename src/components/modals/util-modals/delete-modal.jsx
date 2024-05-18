import React, {useEffect, useState} from "react";
import '../../../styles/buttons/general.css';
import Modal from "..";
import { handleChangeWrapper, handleSubmitWrapper } from "../../../utils";
import { REASONS } from "../../../constants/reasons";

export default function DeleteModal (props) {
    const {stateChecker, stateControl, type, method, id, isSubmittedControl, prim, multipleIds} = props
    const [deleteValue, setDeleteValue] = useState({
        id: id || '',
        mult: multipleIds || '',
        method: method.toLowerCase() || '',
        action: `delete-${type.toLowerCase()}`,
        reason: '',
        prim: prim || '',
      })
    const [errorMessage, setErrorMessage] = useState('');
    const filteredReasons = REASONS.filter(branch => branch.action === 'Delete')[0]?.content.filter(contentItem => contentItem.type === type)[0]?.reasons || [];
    useEffect(() => {
        setDeleteValue(
          {
            ...deleteValue,
            reason: '',
          }
        )
    }, [stateChecker])
    useEffect(() => {
      setDeleteValue({
        ...deleteValue,
        id: id && id,
        mult: multipleIds && multipleIds ,
        method: method && method.toLowerCase(),
        action: type && `delete-${type.toLowerCase()}`,
        prim: prim && prim,
        user: localStorage.getItem('user-email'),
      })
    }, [type, method, id] )
    
    const handleChange = async (event) => {
      await handleChangeWrapper(event, deleteValue, setDeleteValue);
    };

    const handleSubmit = async (event) => {
        if(deleteValue.reason === '')
          setErrorMessage('Please set a reason for deleting!');
        else{
          setErrorMessage('');
          try{
            const response = await handleSubmitWrapper(event, deleteValue, true);
            if (response.success) {
                stateControl((prev) => !prev)
                isSubmittedControl((prev) => !prev)
            }
          } catch (error) {
            console.error('Error: ', error);
          }
        }
    }
    const deleteHeader = (
        <div className='w-100 text-center'>
            <i className='fa-solid fa-trash' style={{ fontSize: '40px' }}></i>
        </div> 
    )
    
    const deleteBody = (
        <div className='text-center'>
            <h3>Confirm Deletion?</h3>
            <p>Are you sure you want to delete {
                method === 'Single' ?
                `this entry?` :
                `these entries?`
            } This cannot be undone!</p>
            {filteredReasons.length !== 0 &&
              
              <select
                name="reason"
                id="reason"
                style={{ width: '100%', boxShadow: 'none' }}
                onChange={handleChange}
                value={deleteValue.reason || ''}
                className="form-select"
            >
                <option value="" disabled hidden>--Select Reason--</option>
                {filteredReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                ))}
            </select>}
        </div>
    )

    const deleteFooter = (
        <div className='d-flex align-items-center justify-content-end'>
          <p className="error-message">{errorMessage}</p>
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

      return <Modal headerContent={deleteHeader} 
      bodyContent={deleteBody} 
      footerContent={deleteFooter} 
      stateChecker={stateChecker} 
      stateControl={stateControl}
      customWidth={'25%'}
      customZIndex={20}/>;
}