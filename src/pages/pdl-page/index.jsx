
import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet-async";
import {TableTemplate} from '../../components';
import { Tabs } from '../../components';
import { PDLModal } from './components';
import { ArchiveModal, DeleteModal, RetrieveModal } from '../../components/modals/util-modals';
export default function Pdl() {
  const tabs = [
    { label: "PDL List", id: "pdlList" },
    { label: "Archived PDLs", id: "archivedItems" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [onArchivedTab, setOnArchivedTab] = useState(activeTab !== 'archivedItems')
  const [isPDLModalOpen, setPDLModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [isRetrieveModalOpen, setRetrieveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [method, setMethod] = useState('');
  
  useEffect(() => {
    setOnArchivedTab(activeTab !== 'archivedItems');
  }, [activeTab]);
  const pdlTableData = [
    {
        tableIcon: 'fa-solid fa-person', //Table Icon Header
        tableName: onArchivedTab ? 'List of PDLs' : 'Archived PDLs', //Table Name Header
        hasPills: [true, //Has Display Statuses
          {
            pillTypes: ['Senior', 'LGBT', 'PWD', 'Regular'] //Status Names
          }],
        tableHeaders: [
          {
            headerId: 'pk',
            headerSecondaryID: 'pdlNo',
            headerName: 'PDL No.',
            hasFilter: false,
            hasLowHigh: true,
          },
          {
            headerId: 'name',
            headerName: 'Name',
            hasFilter: true,
            hasLowHigh: false,
          },
          {
            headerId: 'balance',
            headerName: 'Balance',
            hasFilter: false,
            hasLowHigh: true,
          },
          {
            headerId: 'bjmpBranch',
            headerName: 'BJMP Branch',
            hasFilter: true,
            hasLowHigh: false,
          },
          {
            headerId: 'type',
            headerName: 'Type',
            hasFilter: true,
            hasLowHigh: false,
          },
        ],
        buttonsInTable: [ //Buttons that are in Table
          {
            buttonName: 'Generate Report', //Button Name
            buttonIcon: 'fa-regular fa-file', //Button Icon
            buttonFunctionality: {
              action: 'generateReport',
              function: function(){
                alert('generateReport')
              }
            }, //Button Functionality
            forArchive: false,
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
            forArchive: false,
          },
          {
            buttonName: 'Archive',
            buttonIcon: 'fa-solid fa-box-archive',
            buttonFunctionality: {
              action: 'archiveMultiple',
              typeOfArchive: 'PDL',
              function: function(){
                setArchiveModalOpen((prev) => !prev)
                setMethod('Multiple');
              }
            },
            forArchive: false,
          },
          {
            buttonName: 'Retrieve',
            buttonIcon: 'fa-solid fa-rotate-left',
            buttonFunctionality: {
              action: 'retrieveMultiple',
              typeOfArchive: 'PDL',
              function: function(){
                setRetrieveModalOpen((prev) => !prev);
                setMethod('Multiple');
              }
            },
            forArchive: true,
          },
          {
            buttonName: 'Delete',
            buttonIcon: 'fa-solid fa-trash',
            buttonFunctionality: {
              action: 'deleteMultiple',
              typeOfArchive: 'PDL',
              function: function(){
                setDeleteModalOpen((prev) => !prev);
                setMethod('Multiple');
              }
            },
            forArchive: true,
          },
          {
            buttonName: 'Erase Filters',
            buttonIcon: 'fa-solid fa-filter-circle-xmark',
            buttonFunctionality: {
              action: 'eraseFilter',
              function: function(){
                alert('eraseFilter')
              }
            },
            forArchive: null,
          },
          {
            buttonName: 'Select Multiple',
            buttonIcon: 'fa-solid fa-clipboard-check',
            buttonFunctionality: {
              action: 'enableMultiple',
            },
            forArchive: null,
          },
        ],
        tableData:[
          {
            pk: '000001',
            name: 'DELA CRUZ, Juan Tamad',
            balance: (8).toFixed(2),
            bjmpBranch: 'Marilao Municipal Jail',
            type: ['Regular'],
            isArchived: false,
          },
          {
            pk: '000002',
            name: 'SANTOS, Pedro Arturo',
            balance: (15).toFixed(2),
            bjmpBranch: 'Meycauayan City Jail',
            type: ['PWD', 'Senior'],
            isArchived: false,
          },
          {
            pk: '000003',
            name: 'MERCADO, John Andrew Martin',
            balance: (38).toFixed(2),
            bjmpBranch: 'Baliwag City Jail',
            type: ['LGBT', 'PWD'],
            isArchived: false,
          },
          {
            pk: '000004',
            name: 'GALLARDO, Jermaine Pablo',
            balance: (9).toFixed(2),
            bjmpBranch: 'Baliwag City Jail',
            type: ['PWD'],
            isArchived: false,
          },
          {
            pk: '000005',
            name: 'REYES, Dylan Laurente',
            balance: (13).toFixed(2),
            bjmpBranch: 'Meycauayan City Jail',
            type: ['Regular'],
            isArchived: false,
          },
          {
            pk: '000006',
            name: 'RAMOS, Jiro de Guzman',
            balance: (37).toFixed(2),
            bjmpBranch: 'Guimba District Jail',
            type: ['Regular'],
            isArchived: false,
          },
          {
            pk: '000007',
            name: 'CARLOS, Miles Morales',
            balance: (82).toFixed(2),
            bjmpBranch: 'Camiling Municipal Jail',
            type: ['Regular'],
            isArchived: false,
          },
          {
            pk: '000008',
            name: 'SAN JUAN, Charlie Sotto',
            balance: (25).toFixed(2),
            bjmpBranch: 'Pulilan Municipal Jail',
            type: ['Senior'],
            isArchived: false,
          },
          {
            pk: '000009',
            name: 'FAJARDO, Ryan Janus Alarcon',
            balance: (31).toFixed(2),
            bjmpBranch: 'Balagtas District Jail',
            type: ['Regular'],
            isArchived: false,
          },
          {
            pk: '000010',
            name: 'PUNZALAN, Mark Anthony Reyes',
            balance: (6).toFixed(2),
            bjmpBranch: 'Marilao Municipal Jail',
            type: ['Regular'],
            isArchived: false,
          },
          {
            pk: '000011',
            name: 'GUILLERMO, Harley Manuel',
            balance: (92).toFixed(2),
            bjmpBranch: 'Meycauayan City Jail',
            type: ['Senior'],
            isArchived: false,
          },
          {
            pk: '000012',
            name: 'BENITEZ, Lance Carlos Domingo',
            balance: (36.50).toFixed(2),
            bjmpBranch: 'Tarlac City Jail Male Dorm',
            type: ['LGBT'],
            isArchived: false,
          },
          {
            pk: '000013',
            name: 'RAMIREZ, Jonathan Marcos',
            balance: (37).toFixed(2),
            bjmpBranch: 'Marilao Municipal Jail',
            type: ['Regular'],
            isArchived: true,
          },
        ],
        tableActions: [
          {
            actionName: 'View',
            actionIcon: 'fa-solid fa-eye fa-sm',
            actionFunctionality: {
              action: 'viewPDL',
              function: function(){
                alert("View");
              }
            },
            forArchive: false
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
            },
            forArchive: false
          },
          {
            actionName: 'Archive',
            actionIcon: 'fa-solid fa-box-archive fa-sm',
            actionFunctionality: {
              action: 'archivePDL',
              function: function(){
                setArchiveModalOpen((prev) => !prev);
                setMethod('Single');
              }
            },
            forArchive: false
          },
          {
            actionName: 'Retrieve',
            actionIcon: 'fa-solid fa-rotate-left fa-sm',
            actionFunctionality: {
              action: 'retrievePDL',
              function: function(){
                setRetrieveModalOpen((prev) => !prev);
                setMethod('Single');
              }
            },
            forArchive: true
          },
          {
            actionName: 'Delete',
            actionIcon: 'fa-solid fa-trash fa-sm',
            actionFunctionality: {
              action: 'deletePDL',
              function: function(){
                setDeleteModalOpen((prev) => !prev);
                setMethod('Single');
              }
            },
            forArchive: true
          },
        ],
        noOfItemsInTable: 20,
    },
    
  ]
  return (
    <>
    <div>
        <Helmet>
          <title>BJMP | PDLs</title>
        </Helmet>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TableTemplate 
          tableData={pdlTableData[0]} archived={onArchivedTab}/>
        <PDLModal stateChecker={isPDLModalOpen} stateControl={() => setPDLModalOpen((prev) => !prev)} isEdit={isEdit}/>
        <ArchiveModal 
        stateChecker={isArchiveModalOpen} stateControl={() => setArchiveModalOpen((prev) => !prev)} 
        type={'PDL'} method={method}/>
        <RetrieveModal stateChecker={isRetrieveModalOpen} stateControl={() => setRetrieveModalOpen((prev) => !prev)} 
        type={'PDL'} method={method}/>
        <DeleteModal stateChecker={isDeleteModalOpen} stateControl={() => setDeleteModalOpen((prev) => !prev)} 
        type={'PDL'} method={method} />

  </div>
    </>
    
  );
}

