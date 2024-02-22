
import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet-async";
import {TableTemplate} from '../../components';
import { Tabs } from '../../components';
import { PDLModal } from './components';
export default function Pdl() {
  const tabs = [
    { label: "PDL List", id: "pdlList" },
    { label: "Archived PDLs", id: "archivedItems" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [selectMultipleEnabled, setSelectMultipleEnabled] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filterDropdownColumn, setFilterDropdownColumn] = useState('');
  const [selectedFilter, setSelectedFilter] = useState({

  });
  const [selectedFilterLabel, setSelectedFilterLabel] = useState({});  
  const [isPDLModalOpen, setPDLModalOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => { 
  }, [selectedRows, selectedFilterLabel, selectedFilter])
  const pdlTableData = [
    {
        tableIcon: 'fa-solid fa-person', //Table Icon Header
        tableName: 'List of PDLs', //Table Name Header
        hasPills: [true, //Has Display Statuses
          {
            pillTypes: ['Senior', 'LGBT', 'PWD', 'Regular'] //Status Names
          }],
        tableHeaders: [
          {
            headerId: 'pdlNo',
            headerName: selectedFilterLabel.pdlNo || 'PDL No.',
            hasFilter: false,
            hasLowHigh: true,
          },
          {
            headerId: 'name',
            headerName: selectedFilterLabel.name || 'Name',
            hasFilter: true,
            hasLowHigh: false,
          },
          {
            headerId: 'balance',
            headerName: selectedFilterLabel.balance || 'Balance',
            hasFilter: false,
            hasLowHigh: true,
          },
          {
            headerId: 'bjmpBranch',
            headerName: selectedFilterLabel.bjmpBranch || 'BJMP Branch',
            hasFilter: true,
            hasLowHigh: false,
          },
          {
            headerId: 'type',
            headerName: selectedFilterLabel.type || 'Type',
            hasFilter: true,
            hasLowHigh: false,
          },
        ],
        buttonsInTable: [ //Buttons that are in Table
          {
            buttonName: 'Generate Report', //Button Name
            buttonIcon: 'fa-regular fa-file', //Button Icon
            buttonFunctionality: '#', //Button Functionality
            buttonInitialVisibility: !selectMultipleEnabled //Button Visibility
          },
          {
            buttonName: 'Add PDL',
            buttonIcon: 'fa-regular fa-plus',
            buttonFunctionality: {
              action: 'addPDL',
              function: function(){
                setPDLModalOpen((prev) => !prev);
                setEdit(false);
              }
            },
            buttonInitialVisibility: !selectMultipleEnabled
          },
          {
            buttonName: 'Archive',
            buttonIcon: 'fa-solid fa-box-archive',
            buttonFunctionality: '#',
            buttonInitialVisibility: selectedRows.length > 0
          },
          {
            buttonName: 'Erase Filters',
            buttonIcon: 'fa-solid fa-filter-circle-xmark',
            buttonFunctionality: 'eraseFilter',
            buttonInitialVisibility: false
          },
          {
            buttonName: 'Select Multiple',
            buttonIcon: 'fa-solid fa-clipboard-check',
            buttonFunctionality: {
              action: 'enableMultiple',
              function: function() {
                setSelectMultipleEnabled((prevState) => !prevState);
                setSelectedRows([]);
                if(!selectMultipleEnabled){
                  setSelectedRows([]);
                  setSelectedFilterLabel(({
                    pdlNo: 'PDL No.', 
                    name: 'Name',
                    balance: 'Balance', 
                    bjmpBranch: 'BJMP Branch',
                    type: 'Type'
                   
                  }))
                  setSelectedFilter({
                    pdlNo: '', 
                    name: '',
                    balance: '', 
                    bjmpBranch: '',
                    type: ''
                  })
                  ;
                }
              }
            },
            buttonInitialVisibility: true
          },
        ],
        tableData:[
          {
            pdlNo: '000001',
            name: 'DELA CRUZ, Juan Tamad',
            balance: `₱${(0).toFixed(2)}`,
            bjmpBranch: 'Marilao Municipal Jail',
            type: ['Regular']
          },
          {
            pdlNo: '000002',
            name: 'DELA CRUZ, Juan Tamad',
            balance: `₱${(0).toFixed(2)}`,
            bjmpBranch: 'Marilao Municipal Jail',
            type: ['PWD', 'Senior']
          }
        ],
        tableActions: [
          {
            actionName: 'View',
            actionIcon: 'fa-solid fa-eye fa-sm',
            actionFunctionality: '#'
          },
          {
            actionName: 'Edit',
            actionIcon: 'fa-solid fa-pen-to-square fa-sm',
            actionFunctionality: {
              action: 'editPDL',
              function: function(){
                setPDLModalOpen((prev) => !prev);
                setEdit(true);
              }
            }
          },
          {
            actionName: 'Archive',
            actionIcon: 'fa-solid fa-box-archive fa-sm',
            actionFunctionality: '#'
          },
        ],
        noOfItemsInTable: 20,
    },
  ]
  const handleFilterSelect = (column, value) => {
    setSelectedFilter((prev) => ({ ...prev, [column]: value }));
    setFilterDropdownOpen(false);

    // Update selectedFilterLabel based on selected filters
    setSelectedFilterLabel((prev) => ({
      ...prev,
      [column]: value !== '' ? `${column}: ${value}` : '', // Update label with filter value
    }));
  };
  useEffect(() => {
    // Update table headers when filters change
    pdlTableData[0].tableHeaders.forEach((header) => {
      header.headerName = selectedFilterLabel[header.headerId] || header.headerName;
    });
  }, [selectedFilterLabel]);
  return (
    <>
    <div>
      
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
      {activeTab === 'pdlList' && 
      <TableTemplate 
        props={pdlTableData[0]} 
        selectMultipleEnabled={selectMultipleEnabled}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedFilterLabel={selectedFilterLabel}
        setSelectedFilterLabel={setSelectedFilterLabel}
        handleFilterSelect={handleFilterSelect}/>}
      {/*activeTab === 'archivedItems' && <TableTemplate />*/}
      <PDLModal stateChecker={isPDLModalOpen} stateControl={() => setPDLModalOpen((prev) => !prev)} isEdit={isEdit}/>
  </div>
    </>
    
  );
}

