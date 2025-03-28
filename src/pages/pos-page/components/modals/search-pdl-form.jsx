import React, { useEffect, useRef, useState } from "react";
import { fetchDataWrapper } from "../../../../utils";

export default function SearchPdlForm(props) {
    const {formData, setFormData, handleChange, totalPrice, eraseData, 
        setIsNamePopulated, isNamePopulated, searchTerm, setSearchTerm, } = props
    const [allPdlData, setAllPdlData] = useState([]);

    const [showAutocomplete, setShowAutocomplete] = useState(false);
    
    const inputRef = useRef(null);
    useEffect(() => {
        fetchAllPdlData();
    }, [])
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowAutocomplete(value !== ''); // Show autocomplete suggestions when there's input
        setIsNamePopulated(false);
    };
    const handleAutocompleteClick = (id, name) => {
        setShowAutocomplete(false); // Hide autocomplete after selection
        setIsNamePopulated(true);
        fetchPdlData(id, (formattedName) => {
            setSearchTerm(formattedName);
        });
        
    };
    
    const erasePdlData = () => {
        setSearchTerm('');
        setIsNamePopulated(false);
        eraseData('pdl-data');
    };
    const fetchPdlData = async (id, callback) => {
        let params = [['id', id]];
        const bjmpBranch = localStorage.getItem('bjmp-branch');

        if (bjmpBranch !== 'BJMPRO-III Main Office') {
            params.push(['br', bjmpBranch]);
        }
        try {
            const data = await fetchDataWrapper('get-pdl', params);
            const userImage = data['pdl-image'] ? data['pdl-image'].replace('../api/files/images/pdls/', '') : '';
            const formattedName = `${(data['pdl-last-name']).toUpperCase()}, ${data['pdl-first-name']} ${data['pdl-middle-name']}`;
            setFormData({
                ...formData,
                'pdl-data': {
                    "pk": data['pk'] || '',
                    "pdl-first-name": data['pdl-first-name'] || '',
                    "pdl-middle-name": data['pdl-middle-name'] || '',
                    "pdl-last-name": data['pdl-last-name'] || '',
                    "pdl-id": data['pdl-id'] || '',
                    "pdl-age": data['pdl-age'] || '',
                    "pdl-gender": data['pdl-gender'] || '',
                    "pdl-other-gender": data['pdl-other-gender'] || '',
                    "pdl-cell-no": data['pdl-cell-no'] || '',
                    "pdl-medical-condition": data['pdl-medical-condition'] || '',
                    "pdl-branch-location": data['pdl-branch-location'] || '',
                    "pdl-balance": parseFloat(data['pdl-balance']).toFixed(2) || '',
                    "pdl-fingerprint-id": data['pdl-fingerprint-id'] || '',
                    "pdl-image": userImage || ''
                }
            });
            
            if (callback) {
                callback(formattedName);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const filteredOptions = allPdlData.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const fetchAllPdlData = async () => {
        try{
            let params = [];
            const bjmpBranch = localStorage.getItem('bjmp-branch');

            if (bjmpBranch !== 'BJMPRO-III Main Office') {
                params.push(['br', bjmpBranch]);
            }
            const rawData = await fetchDataWrapper('get-pdls', params);
            const transformedData = rawData.map((data) => ({
                dbpk: data['pk'],
                pk: data['pdl-id'],
                name: `${(data['pdl-last-name']).toUpperCase()}, ${data['pdl-first-name']} ${data['pdl-middle-name']}`,
                balance: parseFloat(data['pdl-balance']).toFixed(2),
                bjmpBranch: data['pdl-branch-location'],
            }))
            setAllPdlData(transformedData);
        }
        catch (error){
            console.error('Error fetching data: ', error);
        }
    }
   
    return(
        <>
        <div className="row g-3 align-items-center">
            <div className={`col-${isNamePopulated ? '11' : '12'}`}>
                <label className="col-form-label">Selected PDL:<span className='form-required'>*</span></label>
                <input className="text-input" id="pdl-info" name="pdl-info" placeholder="Enter PDL Info" 
                value={searchTerm}
                onChange={handleSearchChange}
                disabled={isNamePopulated}
                ref={inputRef}></input>
                {filteredOptions.length > 0 && showAutocomplete && (
                    <div className="autocomplete" style={{ width: inputRef.current.offsetWidth }}>
                        {filteredOptions.map((option) => (
                            <div key={option.dbpk} className="filter-option" onClick={() => handleAutocompleteClick(option.dbpk, option.name)}>
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
            {isNamePopulated && (
                        <div className="col-1">
                            <button className="toggle-form-button blue-button" >
                                <p className="icon-hover m-0 item-modal-field-state-button " style={{ transform: 'rotate(45deg)' }} onClick={erasePdlData}>+</p>
                                <span className='icon-tooltip'>Choose Another PDL</span>
                            </button>
                        </div>
                    )}
        <div className="mt-3">
            <label className="col-form-label">PDL's Full Name:</label>
            <h4>{formData['pdl-data'] ? (formData['pdl-data']['pdl-last-name'] ? 
                                (`${(formData['pdl-data']['pdl-last-name']).toUpperCase()}`) : formData['pdl-data']['pdl-last-name']) : 'XXXXXXXXX'}, 
                            {formData['pdl-data'] ? ` ${formData['pdl-data']['pdl-first-name']}` : ' XXXX'} 
                            {formData['pdl-data'] ? ` ${formData['pdl-data']['pdl-middle-name']}` : ' XXXXX'}</h4>
        </div>
        <div className="mt-3">
            <label  className="col-form-label">Balance:</label>
            <h4>₱{formData['pdl-data'] ? formData['pdl-data']['pdl-balance'] : 'XX.XX'}</h4>
        </div>
        <div className="mt-3">
            <label className="col-form-label">Payment Method:</label>
            <div className="custom-select-wrapper">
                <select id="purchase-type" name="purchase-type" onChange={handleChange} value={formData['purchase-type'] || ''}>
                <option className="pdl-modal-option" value="" disabled hidden>--Select Payment Method--</option>
                    <option className="pdl-modal-option" value="Biometrics">Biometrics</option>
                    <option className="pdl-modal-option" value="Permission">Permission</option>
                </select>
            </div>
            
        </div>
        <div className="my-3 d-flex align-items-center">
        {formData['purchase-type'] === 'Permission' && ( // Check if the selected payment method is "Permission"
                <>
                    <input type="checkbox" id="payment-method" name="permission" className="form-check-input mx-2" onChange={handleChange}/>
                    <label htmlFor="payment-method" name="permission" className="col-form-label ml-2 my-0">I have permission to conduct this transaction according to the warden in command.</label>
                </>
            )}
        {formData['purchase-type'] === 'Biometrics' && ( // Check if the selected payment method is "Permission"
               <div className="my-2">
                    <label  className="col-form-label">Fingerprint ID:</label>
                    <h4>{formData['pdl-data']['pdl-fingerprint-id'] ? 'Available' : 'Not Available'}</h4>
                </div>
            )}
        </div>
        
        <hr></hr>
        <div className="d-flex align-items-center justify-content-between">
            <h5>Total: </h5>
            <h5>₱{totalPrice} </h5>
        </div>
        </div>
        
        </>
    )
}