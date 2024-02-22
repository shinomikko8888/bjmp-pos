import React, {useState, useEffect} from "react";
import '../../styles/dashboard-page/tables.css'
import '../../styles/dashboard-page/pills.css'
import FilterDropdown from "./filter-dropdown";

export default function TableTemplate(
    {
        props,
        selectMultipleEnabled,
        selectedRows,
        setSelectedRows,
        selectedFilter,
        setSelectedFilter,
        selectedFilterLabel,
        setSelectedFilterLabel,
        handleFilterSelect
    })
    {
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [filterDropdownColumn, setFilterDropdownColumn] = useState('');
    const pillTypes = props?.hasPills?.[1]?.pillTypes || [];
    const getCellStyleForType = (type) => {
        // Map type to corresponding CSS class
        
        const cases = pillTypes.map(pillType => (
          `
          case '${pillType}':
            return '${pillType}';
          `
        ));
        return eval(`
          (function() {
            switch (type) {
              // Dynamically generate cases based on pillTypes
              ${cases.join('\n')}
              default:
                return ''; // Use a default style if needed
            }
          })()
        `);
      };

      const generateButtons = (buttons) => {
        return buttons.map((button, index) => (
            <>
            {button.buttonInitialVisibility && (
                <button
                    key={index}
                    className={`table-button me-2 ${selectMultipleEnabled && button.buttonName === 'Select Multiple' ? 'table-button-active' : ''}`}
                    style={{ left: '0' }}
                    type='button'
                    onClick={() => handleButtonClick(button.buttonFunctionality)} // Adjust this to handle button click
                >
                    <i className={`fa-regular ${button.buttonIcon} icon-hover`}></i>
                    <span className='icon-tooltip'>{button.buttonName}</span>
                </button>
            )}
                
            </>
          
        ));
      };

      const generateActions = (actions) => {
        return actions.map((action, index) => (
            <p key={index} onClick={() => handleButtonClick(action.actionFunctionality)}>
                <i className={`${action.actionIcon} icon-hover`}></i>
                <span className='icon-tooltip'>{action.actionName}</span>
            </p>
        ))
      }

      const handleButtonClick = (functionality) => {
        if(functionality.function()){
            functionality.function();
        }
      };
      const handleRowClick = (rowIndex) => {
        if (selectMultipleEnabled) {
          // Toggle the selected state of the clicked row
          setSelectedRows((prevSelectedRows) => {
            const isSelected = prevSelectedRows.includes(rowIndex);
            return isSelected
              ? prevSelectedRows.filter((index) => index !== rowIndex)
              : [...prevSelectedRows, rowIndex];
          });
        }
      };

      const toggleFilterDropdown = (column) => {
        setFilterDropdownColumn(filterDropdownColumn === column ? '' : column);
        setFilterDropdownOpen(!isFilterDropdownOpen);
      };
      
      const renderFilterDropdown = (column) => {
        if (filterDropdownColumn === column && isFilterDropdownOpen) {
          return (
            <FilterDropdown 
                options={['Hello', 'Hello2']}
                onSelect={(option) => handleFilterSelect(option, column)}
            />
          );
        }
        return null;
      };
      
    return(
        <>
            <div className="table-container p-4">
                <div className='row mt-1'>
                    <div className='row d-flex align-items-center position-relative'>
                        <div className='col-4 d-flex align-items-center mb-3'>
                            <i className={props.tableIcon}></i>
                            <h6 className='fw-bold fs-5 m-0 mx-2'>{props.tableName}</h6>
                        </div>
                        <div className='col-8 d-flex justify-content-end'>
                            <div className='mx-4 d-flex align-items-center' style={{fontSize: '12px'}}>
                                <div>
                                    <div className='row d-flex'>
                                        {pillTypes.map(pillType => (
                                            <div key={pillType} style={{ padding: '0 5px' }} className={`type-cell ${getCellStyleForType(pillType)}`}>
                                                {pillType}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {generateButtons(props.buttonsInTable)}
                            
                        </div>
                        <div className='col-12 mx-auto w-100 mt-3'>
                            <table className="clean-table selectable-table" style={{border: selectMultipleEnabled ? '2px dashed #ccc' : ''}}>
                                <thead>
                                    {
                                        selectMultipleEnabled && (
                                            <th>
                                                Select
                                            </th>
                                        )
                                    }      
                                    {props.tableHeaders.map((header, index) => (
                                        <th key={index}>
                                            {header.headerName}
                                            {!selectMultipleEnabled && header.hasFilter &&(<><i className='fa-solid fa-filter ms-2' style={{cursor: 'pointer'}} 
                                                onClick={() => toggleFilterDropdown(header.headerName)}></i>
                                                {renderFilterDropdown(header.headerName)}</>)}
                                            {!selectMultipleEnabled && header.hasLowHigh &&(<><i className='fa-solid fa-sort ms-2' style={{cursor: 'pointer'}} 
                                                onClick={() => toggleFilterDropdown(header.headerName)}></i>
                                                {renderFilterDropdown(header.headerName)}</>)}
                                        </th>
                                    ))}
                                    <th>
                                        Actions
                                    </th>
                                </thead>
                                <tbody>
                                {[...Array(props.noOfItemsInTable)].map((_, rowIndex) => {
                                    const rowData = props.tableData[rowIndex] || {};
                                    const isEven = rowIndex % 2 === 0;
                                    const zebraClass = isEven ? "zebra-even" : "zebra-odd";
                                    const isEmptyRow = Object.keys(rowData).length === 0;
                                    const isSelected = selectMultipleEnabled && !isEmptyRow && selectedRows.includes(rowIndex);

                                    return (
                                    <tr key={rowIndex} className={`${zebraClass} ${isSelected ? "selected-row" : ""}`} onClick={() => handleRowClick(rowIndex)}
                                    style={{cursor: !isEmptyRow && selectMultipleEnabled && 'pointer'}} >
                                        {selectMultipleEnabled && <td style={isEmptyRow ? { padding: '20px' } : {padding: '12px'}}>
                                        {!isEmptyRow && (
                                            <i className={`fa-regular ${isSelected ? 'fa-square-check' : 'fa-square'}`}></i>
                                        )}
                                        </td>}
                                        {props.tableHeaders.map((header, colIndex) => (
                                        <td key={colIndex} style={isEmptyRow ? { padding: '20px' } : {padding: '12px'}}>
                                            {isEmptyRow ? null : (
                                                (() => {
                                                    switch (header.headerId) {
                                                        case 'pdlNo':
                                                            return `PDL-${rowData[header.headerId]}`;
                                                        case 'type':
                                                            return (
                                                                <div className="d-flex">
                                                                    {rowData[header.headerId].map((type, index) => (
                                                                        <div style={{ padding: '2px 8px', fontSize: '12px' }} className={`type-cell ${getCellStyleForType(type)}`}>
                                                                            {type}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                );
                                                        default:
                                                            return rowData[header.headerId];
                                                    }
                                                })()
                                            )}
                                        </td>
                                        ))}
                                        <td>
                                        {isEmptyRow ? null : (
                                            <div className="action-buttons">
                                            {generateActions(props.tableActions)}
                                            </div>
                                        )}
                                        </td>
                                    </tr>
                                    );
                                })}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}