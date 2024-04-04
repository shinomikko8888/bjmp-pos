import React, { useState } from "react";
import './../../styles/dashboard-page/tables.css'
import { BRANCHES } from "../../constants";

export default function FilterDropdown({ column, options, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAutocomplete, setShowAutocomplete] = useState(false);

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
