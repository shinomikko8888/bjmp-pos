import React, { useEffect, useState } from "react";
import { fetchDataWrapper, handleChangeWrapper } from "../../../../utils";

export default function LoadTopRowPage1(props) {
    const { data, loadData, setLoadData, eraseData } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [isNamePopulated, setIsNamePopulated] = useState(false);
    useEffect(() => {
        if (loadData['pdl-data']) {
            const pdlData = loadData['pdl-data'];
            const formattedName = `${(pdlData['pdl-last-name'] || '').toUpperCase()}, ${pdlData['pdl-first-name'] || ''} ${pdlData['pdl-middle-name'] || ''}`;
            setSearchTerm(formattedName);
            setIsNamePopulated(true);
        }
    }, [loadData]);
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowAutocomplete(value !== ''); // Show autocomplete suggestions when there's input
        setIsNamePopulated(false);
    };

    const erasePdlData = () => {
        setSearchTerm('');
        setIsNamePopulated(false);
        eraseData('pdl-data');
    };

    const handleAutocompleteClick = (id, name) => {
        setShowAutocomplete(false); // Hide autocomplete after selection
        setIsNamePopulated(true);
        fetchData(id, (formattedName) => {
            setSearchTerm(formattedName);
        });
    };

    const filteredOptions = data.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchData = async (id, callback) => {
        let params = [['id', id]];
        const bjmpBranch = localStorage.getItem('bjmp-branch');

        if (bjmpBranch !== 'BJMPRO-III Main Office') {
            params.push(['br', bjmpBranch]);
        }
        try {
            const data = await fetchDataWrapper('get-pdl', params);
            const userImage = data['pdl-image'] ? data['pdl-image'].replace('../api/files/images/pdls/', '') : '';
            const formattedName = `${(data['pdl-last-name']).toUpperCase()}, ${data['pdl-first-name']} ${data['pdl-middle-name']}`;
            setLoadData({
                ...loadData,
                'pdl-data': {
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

    const handleChange = async (event) => {
        await handleChangeWrapper(event, loadData, setLoadData);
    };

    return (
        <>
            <div>
                <div className="row g-3 align-items-center">
                    <div className={`col-${isNamePopulated ? '11' : '12'}`}>
                        <label htmlFor="pdl-information" className="col-form-label">Enter PDL:<span className='form-required'>*</span></label>
                        <input
                            type="text"
                            id="pdl-information"
                            name="pdl-information"
                            className="form-control"
                            style={{ boxShadow: 'none' }}
                            placeholder="Enter PDL Information"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            disabled={isNamePopulated} // Disable input field if name is populated
                        />
                        {filteredOptions.length > 0 && showAutocomplete && (
                            <div className="autocomplete" style={{left: 0}}>
                                {filteredOptions.map((option) => (
                                    <div key={option.pk} className="filter-option" onClick={() => handleAutocompleteClick(option.pk, option.name)}>
                                        {option.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {isNamePopulated && (
                        <div className="col-1">
                            <button className="toggle-form-button" onClick={erasePdlData}>
                                <p className="icon-hover m-0 item-modal-field-state-button" style={{ transform: 'rotate(45deg)' }}>+</p>
                                <span className='icon-tooltip'>Choose Another PDL</span>
                            </button>
                        </div>
                    )}
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col-12">
                        <label htmlFor="loading-type" className="col-form-label">Load Type:<span className='form-required'>*</span></label>
                        <select
                            id="loading-type"
                            name="loading-type"
                            className="form-select"
                            style={{ boxShadow: 'none' }}
                            value={loadData['loading-type'] || ''}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>Select load type</option>
                            <option value="Livelihood">Livelihood</option>
                            <option value="Visitor">Visitor</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}
