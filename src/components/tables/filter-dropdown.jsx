import React, { useState } from "react";
import './../../styles/dashboard-page/tables.css'
import { BRANCHES } from "../../constants";

export default function FilterDropdown({ column, options, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [startDate, setStartDate] = useState({
        date: '',
      });
      const [endDate, setEndDate] = useState({
        date: '',
      });
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [errorMessage, setErrorMessage] = useState("");
    const handleSelect = () => {
        if(!startDate.date || !endDate.date){
          setErrorMessage('Please enter a valid range');
        }
        else{
          onSelect(`${startDate.date}
          - ${endDate.date}`);
        }
        
      };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowAutocomplete(value !== ''); // Show autocomplete suggestions when there's input
    };

    const handleAutocompleteClick = (option) => {
        setSearchTerm(option);
        onSelect(option);
        setShowAutocomplete(false); // Hide autocomplete after selection
    };

    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));

    const renderOptions = () => {
        switch (column) {
            case 'name':
            case 'userName':
                return (
                    <>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {showAutocomplete && (
                            <div className="autocomplete">
                                {filteredOptions.map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => handleAutocompleteClick(option)}
                                        className='filter-option'
                                    >
                                        <div>
                                            <span>{option}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
            case 'bjmpBranch':
                return (<select
                    name="branch"
                    id="branch"
                    style={{ width: '100%', boxShadow: 'none' }}
                    onChange={(e) => onSelect(e.target.value)}
                    value={searchTerm || ''} // Set value to searchTerm to handle default option
                >
                    <option value="" disabled hidden>--Select Branch--</option> {/* Default option */}
                    {BRANCHES.map(branch => (
                        <optgroup key={branch.label} label={branch.label}>
                            {branch.facilities.map((facility, subIndex) => (
                                <option key={subIndex} value={facility}>{facility}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                    );
            case 'product':
                return (
                    <>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {showAutocomplete && (
                            <div className="autocomplete">
                                {filteredOptions.map((option) => {
                                    // Splitting the option into productName and productType
                                    const [productName, productType] = option.split(/\s+\(|\)/);
                                    return (
                                        <div
                                            key={option}
                                            onClick={() => handleAutocompleteClick(option)}
                                            className='filter-option'
                                        >
                                            <div>
                                                <span>{productName}</span>
                                                <span style={{ marginLeft: '5px', color: 'gray' }}>
                                                    ({productType})
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                );
            case 'changelogDateAndTime':
            case 'transactionDateAndTime':
                return <div className='p-3'>
                <label htmlFor="start-date">Start Date:</label>
                  <div className='row d-flex'>
                    <div className='col-12'>
                      <input
                        type="date"
                        id="start-date"
                        value={startDate.date}
                        max={formattedDate}
                        onChange={(e) => 
                          setStartDate((p) => ({...p, date: e.target.value}))}
                      />
                    </div>
                  
                  </div>
                  
                <label htmlFor="end-date">End Date:</label>
                <div className='row d-flex'>
                    <div className='col-12'>
                      <input
                        type="date"
                        id="start-date"
                        value={endDate.date}
                        max={formattedDate}
                        onChange={(e) => 
                          setEndDate((p) => ({...p, date: e.target.value}))}
                      />
                    </div>
                  </div>
                  <p style={{color: 'red', fontSize: '8px', margin: '0'}}>{errorMessage}</p>
                <div className='row d-flex justify-content-end mt-2 mx-1'>
                  <button className="link-btn" onClick={handleSelect}>Apply</button>
                </div>
              </div>
                break;
            default:
                return filteredOptions.map((option) => (
                    <div
                        key={option}
                        onClick={() => onSelect(option)}
                        className='filter-option'
                    >
                        <div>
                            <span>{option}</span>
                        </div>
                    </div>
                ));
        }
    };

    return (
        <div className='filter-dropdown'>
            {renderOptions()}
        </div>
    );
}
