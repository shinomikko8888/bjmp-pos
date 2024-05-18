import React, {useState, useEffect, useMemo} from "react";
import '../../styles/dashboard-page/tables.css'
import '../../styles/dashboard-page/pills.css'
import FilterDropdown from "./filter-dropdown";
import { empty_result } from "../../assets/svg";
import SearchBar from "../navigation/search-bar";

export default function TableTemplate(props){
    const {tableData, archived, fromModal, returnData, setRows, actionSubmitted} = props
    const [selectedRows, setSelectedRows] = useState([]);
    const [isMultipleSelectionEnabled, setMultipleSelectionEnabled] = useState(false);
    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState(null);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState({});
    const [isSortedOrFiltered, setIsSortedOrFiltered] = useState(false); // State to track if the list is sorted or filtered
    const [headerNames, setHeaderNames] = useState(tableData.tableHeaders.map(header => header.headerName));
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(tableData.noOfItemsInTable);
    const pillTypes = tableData?.hasPills?.[1]?.pillTypes || [];
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
      const filteredAndSortedData = useMemo(() => {
        let filteredAndSortedTableData = [...tableData.tableData];
      
        // Apply filtering
        Object.keys(filters).forEach((headerId) => {
            const value = filters[headerId];
            if (value) {
                if (headerId === "type") {
                    filteredAndSortedTableData = filteredAndSortedTableData.filter((row) =>
                        row[headerId].includes(value)
                    );
                } else if (headerId === "changelogDateAndTime" || headerId === "transactionDateAndTime") {
                  const [startDateString, endDateString] = value.split(' - ');

                  // Convert date strings to Date objects
                  const startDate = new Date(startDateString.trim());
                  const endDate = new Date(endDateString.trim());

                  // Adjust endDate to include the whole day
                  endDate.setDate(endDate.getDate());

                  filteredAndSortedTableData = filteredAndSortedTableData.filter((row) => {
                      const rowDate = new Date(row[headerId]);
                      return rowDate > startDate && rowDate < endDate;
                  });
              } else {
                    filteredAndSortedTableData = filteredAndSortedTableData.filter((row) =>
                        row[headerId].toLowerCase().includes(value.toLowerCase())
                    );
                }
            }
        });
    
        filteredAndSortedTableData = filteredAndSortedTableData.filter(row => row.isArchived !== archived);
        
        // Apply sorting if sortConfig is defined
        if (sortConfig) {
            filteredAndSortedTableData.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
    
                // Check for specific headers
                if (sortConfig.key === 'balance' || sortConfig.key === 'price') {
                  
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                    
                    return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
                }
    
                // Check for integers
                const isInteger = (value) => !isNaN(value) && !value.toString().includes('.');
                if (isInteger(aValue) && isInteger(bValue)) {
                    aValue = parseInt(aValue, 10);
                    bValue = parseInt(bValue, 10);
                    
                    return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
                }
    
                // Check for dates
                const isDate = (value) => !isNaN(Date.parse(value));
                if (isDate(aValue) && isDate(bValue)) {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                    
                    return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
                }
    
                // Default string sorting
                aValue = String(aValue).toLowerCase();
                bValue = String(bValue).toLowerCase();
    
                if (aValue < bValue) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        
        return filteredAndSortedTableData;
    }, [tableData.tableData, filters, sortConfig]);
    
    
    const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredAndSortedData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => {
      if (pageNumber < 1 || pageNumber > totalPages) {
          return;  // Do nothing if the page number is out of bounds
      }
      setCurrentPage(pageNumber);
  };
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage + 1;
    const lastItemIndex = Math.min(indexOfLastRow, filteredAndSortedData.length);

    return (
        <div className="pagination-container">
            
            <ul className="pagination m-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        className="pagination-link"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button 
                            onClick={() => handlePageChange(number)} 
                            className={`pagination-link ${currentPage === number ? 'pagination-link-active' : ''}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        className="pagination-link"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
            <div className="text-center text-muted pagination-info">
                {pageNumbers.length !== 0 ? `${indexOfFirstRow}-${lastItemIndex} out of ${filteredAndSortedData.length}` : 'No items available'}
            </div>
        </div>
    );
};

    const handleFilterChange = (headerId, value) => {
      const updatedFilters = { ...filters, [headerId]: value };
      setFilters(updatedFilters);
      setIsSortedOrFiltered(true);
      setFilterDropdownOpen(false);
  
      // Update the header names with new filter values
      const updatedHeaderNames = tableData.tableHeaders.map((header) => {
          if (header.headerId === headerId) {
              return value ? `${header.headerName} (${value})` : header.headerName; // Update filter text
          }
          // If another filter is already applied, keep the previous filter text
          if (filters[header.headerId]) {
              const oldValue = filters[header.headerId];
              return `${header.headerName} (${oldValue})`;
          }
          return header.headerName;
      });
      setHeaderNames(updatedHeaderNames);
  };
    
      const resetHeaderNames = () => {
        const originalHeaderNames = tableData.tableHeaders.map(header => header.headerName);
        setHeaderNames(originalHeaderNames);
    };
      
      // Function to apply filtering to table data
      const generateFilterDropdowns = () => {
        const dataToRender = currentRows;
        const dataLength = dataToRender.length;
        
        return tableData.tableHeaders.map((header, index) => {
        if (header.headerId === 'dateArchived' && archived) {
          return null;
        }
        return(
          <th key={index}>
            <div className="d-flex align-items-center">
            {headerNames[index]}
              {header.hasFilter  && (
                <i
                  className="fa-solid fa-filter mx-1 filter-icon"
                  onClick={() => handleFilterClick(header.headerId)}
                  style={{cursor: 'pointer'}}
                ></i>
              )}
              {filterDropdownOpen[header.headerId]  && ( // Check if the dropdown should be open
                <FilterDropdown
                    column={header.headerId}
                    options={getUniqueValues(header.headerId)}
                    onSelect={(value) => handleFilterChange(header.headerId, value)}
                />
              )}
              {header.hasLowHigh  &&(
                <div className="mx-1 filter-icon" onClick={() => handleSort(header.headerId)} >
                  <i
                    className={`fa-solid ${
                      sortConfig &&
                      sortConfig.key === header.headerId &&
                      sortConfig.direction === "ascending"
                        ? "fa-sort-down" :
                      sortConfig &&
                      sortConfig.key === header.headerId &&
                      sortConfig.direction === "descending" ?
                        "fa-sort-up"
                        : "fa-sort"
                    }`}
                    style={{cursor: 'pointer'}}
                    onSelect={(value) => handleFilterChange(header.headerId, value)}
                  ></i>

                </div >
              )}
            </div>
          </th>
        )});
      };
      const handleSort = (headerId) => {
        // Check if the column is already sorted and set the new direction
        const direction =
          sortConfig && sortConfig.key === headerId && sortConfig.direction === "ascending"
            ? "descending"
            : "ascending";
      
        // Set the new sorting configuration
        setIsSortedOrFiltered(true);
        setSortConfig({ key: headerId, direction });
    };
      const getUniqueValues = (headerId) => {
        const uniqueValues = new Set();
        tableData.tableData.forEach((row) => {
          if (row[headerId] && row.isArchived !== archived) {
            switch (headerId) {
              case "name":
              case "userName":
                // Extracting characters before comma (last name)
                const lastName = row[headerId].split(",")[0].trim();
                uniqueValues.add(lastName);
                break;
              case "type":
                // Filtering out specific values for the type column
                const allowedTypes = ["Regular", "Senior", "PWD", "LGBT"];
                row[headerId].forEach((type) => {
                  if (allowedTypes.includes(type)) {
                    uniqueValues.add(type);
                  }
                });
                break;
              
              default:
                uniqueValues.add(row[headerId]);
            }
          }
        });
        return Array.from(uniqueValues);
      };

      const handleFilterClick = (headerId) => {
        setFilterDropdownOpen((prevState) => ({
          ...prevState,
          [headerId]: !prevState[headerId],
        }));
      };
      const generateButtons = (buttons, archived) => {

        const filteredButtons = buttons.filter(button => button.forArchive !== archived);
        return filteredButtons.map((button, index) => {
            // Add IDs of buttons here if necessary
            if (
                button.buttonFunctionality.action === 'generateReport' && (isMultipleSelectionEnabled) ||
                button.buttonFunctionality.action === 'addPDLEntry' && (isMultipleSelectionEnabled) ||
                button.buttonFunctionality.action === 'addStockEntry' && (isMultipleSelectionEnabled) ||
                button.buttonFunctionality.action === 'addUserEntry' && (isMultipleSelectionEnabled) ||
                button.buttonFunctionality.action === 'addInstanceEntry' && (isMultipleSelectionEnabled) ||
                button.buttonFunctionality.action === 'eraseFilter' && (!isSortedOrFiltered) ||
                button.buttonFunctionality.action === 'archiveMultiple' && (!isMultipleSelectionEnabled || selectedRows.length === 0) ||
                button.buttonFunctionality.action === 'retrieveMultiple' && (!isMultipleSelectionEnabled || selectedRows.length === 0) || 
                button.buttonFunctionality.action === 'deleteMultiple' && (!isMultipleSelectionEnabled || selectedRows.length === 0) 
            )
             {
                return null; 
            }
            return (
                <button
                    key={index}
                    className={`table-button me-2 ${isMultipleSelectionEnabled && button.buttonFunctionality.action === 'enableMultiple' ? 'table-button-active' : ''}`}
                    style={{ left: '0', display: 'block' }}
                    type='button'
                    onClick={() => handleButtonClick(button.buttonFunctionality)}
                >
                    <i className={`fa-regular ${button.buttonIcon} icon-hover`}></i>
                    <span className='icon-tooltip'>{button.buttonName}</span>
                </button>
            );
        }).filter(Boolean);
    };
    
    const generateActions = (actions, archived, unselectable, returnData=null, dbpkData=null) => {
      const filteredActions = actions.filter(action => 
        action.forArchive !== archived && 
        !(unselectable && (action.actionName === 'Archive' || action.actionName === 'Edit'))
    );
          return filteredActions.map((action, index) => (
            <p key={index} onClick={() => {
              if (returnData !== null) {
                action.actionFunctionality.function(returnData, dbpkData);
              } else {
                action.actionFunctionality.function();
              }
            }}>
                  <i className={`${action.actionIcon} icon-hover`}></i>
                  <span className='icon-tooltip'>{action.actionName}</span>
              </p>
          ));
      };
      
      const handleRowClick = (pk, unselectable=false, dbpk) => {
        if (isMultipleSelectionEnabled && pk && !unselectable) { 
            setSelectedRows((prevSelectedRows) => {
              const isSelected = prevSelectedRows.some((row) => row.pk === pk);
              if (isSelected) {
                  return prevSelectedRows.filter((row) => row.pk !== pk);
              } else {
                  return [...prevSelectedRows, { pk, dbpk }];
              }
          });
          setRows((prevSelectedRows) => {
            const isSelected = prevSelectedRows.some((row) => row.pk === pk);
            if (isSelected) {
                return prevSelectedRows.filter((row) => row.pk !== pk);
            } else {
                return [...prevSelectedRows, { pk, dbpk }];
            }
        });
        }
    };
    
    const renderTableRows = () => {
      const dataToRender = currentRows;
      const dataLength = dataToRender.length;

      const rowsToRender = rowsPerPage;
      if (dataLength === 0) {
        return (
          <tr>
            <td colSpan={tableData.tableHeaders.length + 1}>
              <div className={`d-flex flex-column align-items-center justify-content-center ${!fromModal ? 'table-display-empty-padding-modal' : 'table-display-empty-padding'} table-display-empty-hover`}>
                <img src={empty_result} width={300} alt="Empty Result" />
                <div className={`${!fromModal ? 'table-display-empty-modal' : 'table-display-empty'} mt-2`}>
                  There is no data present at the moment.
                </div>
              </div>
            </td>
          </tr>
        );
      }
      const rows = Array.from({ length: rowsToRender }, (_, index) => {
        const rowPrimaryKey = index < dataLength ? dataToRender[index].dbpk : {};
        const rowData = index < dataLength ? dataToRender[index] : {};
        const isEven = index % 2 === 0;
        const paddingStyle = index < dataLength ? "12px" : "20px";
        const hasData = Object.values(rowData).some((value) => value !== null && value !== undefined);
        const isSelected = selectedRows.some((row) => row.pk === rowData.pk && row.dbpk === rowData.dbpk);
        const rowClass = isMultipleSelectionEnabled && hasData && isSelected ? "selected-row" : "";
        return (
          <tr key={rowData.pk} onClick={() => handleRowClick(rowData.pk, rowData.unselectable, rowPrimaryKey)} className={`${isEven ? "zebra-even" : "zebra-odd"} ${rowClass}`} 
          style={{ cursor: isMultipleSelectionEnabled && hasData && !rowData.unselectable ? 'pointer' : 'default', 
            }}>
            {hasData && isMultipleSelectionEnabled && (
              <td style={{ padding: paddingStyle }}>
                <i className={`${isSelected ? 'fa-regular fa-square-check' : rowData.unselectable ? 'fa-solid fa-square-xmark' : 'fa-regular fa-square'}`}></i>
              </td>
            )}
            
            {tableData.tableHeaders.map((header) => {
              if (header.headerId === 'dateArchived' && archived) {
                return null;
              }
              return (
              <td key={header.headerId} style={{ padding: paddingStyle }}>
                {(header.headerId === "pk" && header.headerSecondaryID === 'pdlNo' && hasData) || (header.headerId === 'transactionPdl' && hasData) && rowData[header.headerId]
                  ? `PDL-${rowData[header.headerId]}`
                  : header.headerId === "pk" && header.headerSecondaryID === 'stockId' && rowData[header.headerId]
                  ? `Item#${rowData[header.headerId]}`
                  : header.headerId === "pk" && header.headerSecondaryID === 'instanceId' && rowData[header.headerId]
                  ? `Instance#${rowData[header.headerId]}`
                  : header.headerId === "pk" && header.headerSecondaryID === 'transactionNo' && rowData[header.headerId]
                  ? `Transaction#${rowData[header.headerId]}`
                  : header.headerId === "pk" && header.headerSecondaryID === 'changelogId' && rowData[header.headerId]
                  ? `Log#${rowData[header.headerId]}`
                  : header.headerId === "pk" && header.headerSecondaryID === 'userId' && rowData[header.headerId]
                  ? `User#${rowData[header.headerId]}`
                  : header.headerId === "type" && rowData[header.headerId]
                    ? <div className="d-flex">{rowData[header.headerId].map((type, i) => (
                      <div key={i} style={{ padding: "10px", fontSize: "12px" }} className={`type-cell ${getCellStyleForType(type)}`}>
                      </div>
                    ))}</div>
                    : (header.headerId === "balance" || header.headerId === "price" || header.headerId === 'transactionAmount') && hasData && rowData[header.headerId]
                    ? `₱${rowData[header.headerId]}`
                    : header.headerId === "status" && rowData[header.headerId] ? 
                    <div className="d-flex">
                      <div style={{ padding: "6px", fontSize: "12px" }} className={`type-cell ${getCellStyleForType(rowData[header.headerId])}`}>
                          {rowData['remStock']}pcs left
                      </div>
                    </div>
                    : header.headerId === "userType" && rowData[header.headerId] ? 
                    <div className="d-flex">
                      <div style={{ padding: "10px", fontSize: "12px" }} className={`type-cell ${getCellStyleForType(rowData[header.headerId])}`}>
                      </div>
                    </div>
                    : rowData[header.headerId]}
              </td>
            )})}
            {hasData && tableData.tableActions && !isMultipleSelectionEnabled && (
              <td className="action-buttons" style={{ padding: paddingStyle }}>
                {generateActions(tableData.tableActions, archived, rowData.unselectable, rowData.pk, rowPrimaryKey)}
              </td>
            )}
            {!hasData && <td style={{ padding: paddingStyle }}></td>}
          </tr>
        );
      });
    
      return rows;
    };
      const resetSortAndFilter = () => {
        setSortConfig(null);
        setFilters({});
        setIsSortedOrFiltered(false); // Set the state to false when reset
        setFilterDropdownOpen(false);
        resetHeaderNames(); // Reset headerNames
      };
      const handleButtonClick = (functionality) => {
        switch (functionality.action) {
          case 'enableMultiple':
            setMultipleSelectionEnabled((prev) => {
              if (prev) {
                setSelectedRows([]);
              }
              return !prev;
            });
            break;
          case 'eraseFilter':
            resetSortAndFilter(); // Trigger resetSortAndFilter function
            break;
          default:
            functionality.function();
            break;
        }
      };      
      useEffect(() => {
        resetSortAndFilter();
        setMultipleSelectionEnabled(false);
        setSelectedRows([]);
        setRows && setRows([]);
      }, 
      [archived, actionSubmitted])
      
      useEffect(() => {
        setHeaderNames(tableData.tableHeaders.map(header => header.headerName));
      }, [tableData.tableHeaders]);

    return(
        <>
            <div className="table-container p-4">
                <div className='row mt-1'>
                    <div className='row d-flex align-items-center position-relative'>
                        <div className='col-4 d-flex align-items-center mb-3'>
                            <i className={tableData.tableIcon}></i>
                            <h6 className='fw-bold fs-5 m-0 mx-2'>{tableData.tableName}</h6>
                        </div>
                        <div className='col-8 d-flex justify-content-end'>
                        {tableData.hasPills[0] ? (
                                <div className='mx-4 d-flex align-items-center' style={{fontSize: '12px'}}>
                                    <div>
                                        <div className='row d-flex'>
                                            {pillTypes.map(pillType => (
                                                <div key={pillType} style={{ padding: '3px 8px' }} className={`type-cell ${getCellStyleForType(pillType)}`}>
                                                    {pillType}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {generateButtons(tableData.buttonsInTable, archived)}
                            {
                              tableData.searchAvailable &&
                              (
                                <div className="d-flex">
                                  <SearchBar/>
                                </div>
                              )
                            }
                            
                            
                        </div>
                        <div className='col-12 mx-auto w-100 mt-3 table-overflow'>
                            <table className="clean-table selectable-table" style={{border: isMultipleSelectionEnabled ? '2px dashed #ccc' : ''}} >
                                <thead>
                                    {
                                        isMultipleSelectionEnabled && (
                                            <th>
                                                Select
                                            </th>
                                        )
                                    }      
                                    {generateFilterDropdowns()}
                                    {!isMultipleSelectionEnabled && (
                                    <th>
                                        Actions
                                    </th>
                                    )

                                    }
                                    
                                </thead>
                                <tbody>
                                {renderTableRows()}
                                </tbody>

                            </table>
                            
                        </div>
                        <div className="pagination-container mt-2 d-flex align-items-center justify-content-center">
                                {renderPaginationButtons()}
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}