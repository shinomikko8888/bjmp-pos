import React, { useEffect, useState } from 'react'
import Modal from '..'
import { DOMAIN, SECUGEN } from '../../../constants';
import axios from 'axios';
import { handleSubmitWrapper } from '../../../utils';
import { ERROR_CODES } from '../../../constants/scanner-error-code';

export default function FingerprintModal(props){
    const {stateChecker, stateControl, type, fetchData,
        //For Create
        pdlData,
        //For Purchase
        formData, setResultValue, isSubmittedControl, isSubmitted, setPurchaseState} = props
    const [fingerprintState, setFingerprintState] = useState('');
    const [isCapturing, setIsCapturing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [createData, setCreateData] = useState({});

        
    useEffect(() => {
        setFingerprintState('');
        setErrorMessage('');
        if(pdlData){
            setCreateData({
                ...createData,
                'pdl-data': pdlData,
                'fingerprint-data': '',
                'action': 'set-fingerprint',
                'active-email': localStorage.getItem('user-email')
            })
        }
        console.log(isSubmitted);
    }, [stateChecker, pdlData])

    const fingerprintScannerClick = async () => {
        if (fingerprintState === '' && !isCapturing) {
            setFingerprintState('active');
            setIsCapturing(true);
            if (type === 'create') {
                try {
                    const cResponse = await axios.post(`${SECUGEN}SGIFPCapture?Timeout=10000&TemplateFormat=ISO`);
                    const errorCode = cResponse.data.ErrorCode;
                    const fingerprintData = cResponse.data.TemplateBase64;
                    if (errorCode !== 0) {
                        setFingerprintState('fail');
                        setErrorMessage(ERROR_CODES[errorCode]);
                        setIsCapturing(false);
                        setTimeout(() => {
                            setFingerprintState('');
                            setErrorMessage('');
                        }, 2000);
                    } else {
                        
                        setCreateData((prevData) => {
                            setFingerprintState('success');
                            const updatedData = {
                                ...prevData,
                                'fingerprint-data': fingerprintData
                            };
                            handleSubmitWrapper(null, updatedData, false).then((sResponse) => {
                                if (sResponse.success) {
                                    setTimeout(() => {
                                        
                                        setIsCapturing(false);
                                        stateControl((prev) => !prev);
                                        isSubmittedControl((prev) => !prev);
                                        setFingerprintState('');
                                        setErrorMessage('');
                                        fetchData();
                                    }, 2000)
                                    
                                }
                            });
                
                            return updatedData; 
                        });
                        
                    }
                } catch (error) {
                    console.log('Error Details:', error);
                    setFingerprintState('fail');
                    setErrorMessage('Fingerprint API error or no reader detected!')
                    setIsCapturing(false);
                    setTimeout(() => {
                        setFingerprintState('');
                        setErrorMessage('');
                    }, 2000);
                }
            } else {
                try {
                    const fData = formData['pdl-data']['pdl-fingerprint-id'];
                    const response = await axios.post(`${SECUGEN}SGIFPCapture?Timeout=10000&TemplateFormat=ISO`);
                    const ISOMatch = response.data.TemplateBase64;
                    const errorCode = response.data.ErrorCode;
                    if (errorCode !== 0) {
                        setFingerprintState('fail');
                        setErrorMessage(ERROR_CODES[errorCode]);
                        setTimeout(() => {
                            setFingerprintState('');
                        }, 1000);
                    } else {
                        var xmlhttp = new XMLHttpRequest();
                        var params = "template1=" + encodeURIComponent(fData);
                        params += "&template2=" + encodeURIComponent(ISOMatch);
                        xmlhttp.open("POST", `${SECUGEN}SGIMatchScore`, false);
                        xmlhttp.send(params);
    
                        var result;
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            result = JSON.parse(xmlhttp.responseText);
                        } else {
                            result = { ErrorCode: xmlhttp.status, ErrorMessage: "Request failed" };
                        }
                        if (result.MatchingScore >= 100) {
                            
                            const pdlBalance = parseFloat(formData['pdl-data']['pdl-balance']).toFixed(2);
                            const totalPrice = parseFloat(formData['total-price']);
                            const resultValue = (pdlBalance - totalPrice).toFixed(2);
                            const response = await handleSubmitWrapper(null, formData, false);
                            if(response.success){
                                setErrorMessage('');
                                setFingerprintState('success');
                                setResultValue(resultValue);
                                stateControl((prev) => !prev);
                                isSubmittedControl((prev) => !prev);
                                setPurchaseState((prev) => !prev);
                                window.open(`${DOMAIN}/files/docs/receipts/purchase/${response.filepath}`, '_blank');
                            } else{
                                setFingerprintState('fail');
                                setErrorMessage(response.message);
                            }
                        } else {
                            setFingerprintState('fail');
                            setErrorMessage('Matching Score: ' + result.MatchingScore + '. Please try again!');
                            setTimeout(() => {
                                setFingerprintState('');
                            }, 1000);
                        }
                    }
                } catch (error) {
                    setFingerprintState('fail');
                    setErrorMessage('Fingerprint matching API error or no reader detected! Error code: ' + error) ;
                    setTimeout(() => {
                        setFingerprintState('');
                        setErrorMessage('');
                    }, 1000);
                } finally {
                    setIsCapturing(false);
                }
            }
        } else if (fingerprintState === 'active' && !isCapturing) {
            setFingerprintState('');
        }
        /*if (fingerprintState === ''){
            setFingerprintState('active');
        } else if (fingerprintState === 'active'){
            setFingerprintState('success');
        } else if (fingerprintState === 'success'){
            setFingerprintState('fail');
        } else {
            setFingerprintState('')
        }*/
    }


    const fingerprintModalHeader = (
        <>
        <div className='row w-100 d-flex'>
          <div className='col-12 d-flex align-items-center justify-content-between'>
            <div className="d-flex align-items-center">
                <i className="fa-solid fa-fingerprint"></i>
                <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>{type === 'create' ? 'Create Fingerprint ID' : 'Scan To Verify Fingerprint'}</h6>
            </div>
            
          </div>
        </div>
        </>
    )
    
    const fingerprintModalBody = (
        <>
            <div className='text-center mt-3'>
                <i className={`fa-solid fa-fingerprint fingerprint-icon${fingerprintState === 'active' ? '-scanning'
                        : fingerprintState === 'success' ? '-success'
                        : fingerprintState === 'fail' ? '-error'
                        : ''
                    }`} onClick={() => fingerprintScannerClick()}></i>
                    
            </div>
            <label className='text-muted mt-3'>
                Click on the icon to scan the fingerprint
            </label>
            <label className='text-muted'>
                {
                    fingerprintState !== '' ? 
                    'If the scanner turns green, it is a success, otherwise it turns red' 
                    : 'If the scanner turns blue, please scan your fingerprint.'
                }
                
            </label>
            <p className="error-message">{errorMessage}</p>
        </>
    )
    
    const fingerprintModalFooter = (
        <>
        </>
    )

    return <Modal
        headerContent={fingerprintModalHeader}
        bodyContent={fingerprintModalBody}
        footerContent={fingerprintModalFooter}
        stateChecker={stateChecker}
        stateControl={stateControl}
        customWidth={'20%'}
    />
}
