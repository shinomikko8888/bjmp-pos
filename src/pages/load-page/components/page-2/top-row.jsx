import React, { useEffect, useState } from "react";
import { fetchDataWrapper, handleChangeWrapper } from "../../../../utils";

export default function LoadTopRowPage2(props){
    const {loadData, setLoadData, setErrorMessages} = props
    const [options, setOptions] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            let params = [];
            if (loadData['loading-type'] === 'Visitor') {
                params.push(['pid', loadData['pdl-data']['pdl-id']], ['br', loadData['pdl-data']['pdl-branch-location']]);
                const data = await fetchDataWrapper('get-lenders', params);
                const filteredData = data.filter(entry => entry['is-approved'] !== 0);
                setOptions(filteredData);
            } else if (loadData['loading-type'] === 'Livelihood') {
                const data = await fetchDataWrapper('get-users');
                const filteredData = data.filter(entry => entry['user-type'] === 'Administrator');
                setOptions(filteredData);

                const currentUserEmail = localStorage.getItem('user-email');
                const currentUser = filteredData.find(option => option['user-email'] === currentUserEmail);
                if (currentUser) {
                    const currentUserName = `${(currentUser['user-last-name']).toUpperCase()}, ${currentUser['user-first-name']} ${currentUser['user-middle-name']}`;
                    setIsAdmin(true);
                    setLoadData(prevData => ({
                        ...prevData,
                        'pdl-creditor': currentUserName
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const handleChange = async (event) => {
        const { name, value } = event.target;
        if (name === 'load-amount') {
            if (value.trim() === '') {
                
                setErrorMessages(prevState => ({
                    ...prevState,
                    secondError: ''
                }));
            } else {
                const isValidAmount = /^[0-9]*\.?[0-9]+$/.test(value) && parseFloat(value) > 0 && !/e/i.test(value);
                if (!isValidAmount) {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        secondError: 'Please enter a valid number for load amount.'
                    }));
                    return; 
                }
            }
        }
        setErrorMessages(prevState => ({
            ...prevState,
            secondError: ''
        }));
        
        await handleChangeWrapper(event, loadData, setLoadData);
    }
    return(
        <>
            <div>
                <div className="row g-3 align-items-center">
                    <div className="col-6">
                        <label htmlFor="load-amount" className="col-form-label">Enter amount to load:<span className='form-required'>*</span></label>
                        <input type="number" id="load-amount" name="load-amount" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter amount" value={loadData['load-amount'] || ''} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        {loadData['loading-type'] === 'Visitor' && (
                            <>
                                <label htmlFor="pdl-creditor" className="col-form-label">Select 'Paabot' Creditor:<span className='form-required'>*</span></label>
                                <select id="pdl-creditor" name="pdl-creditor" className="form-select" style={{ boxShadow: 'none' }} value={loadData['pdl-creditor'] || ''} onChange={handleChange}>
                                    <option value="" disabled hidden>Select 'paabot' creditor</option>
                                    {options.map(option => (
                                        <option key={option['lender-id']} value={`${(option['lender-last-name']).toUpperCase()}, ${option['lender-first-name']} ${option['lender-middle-name']}`}>
                                            {`${(option['lender-last-name']).toUpperCase()}, ${option['lender-first-name']} ${option['lender-middle-name']} - ${option['lender-relationship']}`}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                        {loadData['loading-type'] === 'Livelihood' && (
                            <>
                                <label htmlFor="pdl-creditor" className="col-form-label">Select Administrator:<span className='form-required'>*</span></label>
                                <select id="pdl-creditor" name="pdl-creditor" className="form-select" style={{ boxShadow: 'none' }} value={loadData['pdl-creditor'] || ''} onChange={handleChange} disabled={isAdmin}>
                                    <option value="" disabled hidden>Select administrator</option>
                                    {options.map(option => (
                                        <option key={option['user-id']} value={`${(option['user-last-name'].toUpperCase())}, ${option['user-first-name']} ${option['user-middle-name']}`}>
                                            {`${(option['user-last-name'].toUpperCase())}, ${option['user-first-name']} ${option['user-middle-name']}`}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}