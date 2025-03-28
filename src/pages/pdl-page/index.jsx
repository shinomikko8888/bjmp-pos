
import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet-async";
import {TableTemplate} from '../../components';
import { Tabs } from '../../components';
import { PDLModal } from './components';
import { ArchiveModal, DeleteModal, RetrieveModal, SuccessfulActionModal } from '../../components/modals/util-modals';
import { fetchDataWrapper } from '../../utils';
import { ADD_DESCRIPTION, ADD_TITLE, ARCHIVE_DESCRIPTION, ARCHIVE_TITLE, DELETE_DESCRIPTION, DELETE_TITLE, EDIT_DESCRIPTION, EDIT_TITLE, RETRIEVE_DESCRIPTION, RETRIEVE_TITLE, TABLE_BIG_CONTENT } from '../../constants';
import { useNavigate } from 'react-router-dom';

export default function Pdl() {
  const tabs = [
    { label: "PDL List", id: "pdlList" },
    { label: "Archived PDLs", id: "archivedItems" },
  ];
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [onArchivedTab, setOnArchivedTab] = useState(activeTab !== 'archivedItems')
  const [isPDLModalOpen, setPDLModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [isRetrieveModalOpen, setRetrieveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
  const [pdlModalSubmitted, setPdlModalSubmitted] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isArchive, setArchive] = useState(false);
  const [isRetrieve, setRetrieve] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [method, setMethod] = useState('');
  const [tableData, setTableData] = useState([]);
  const [pdlId, setPdlId] = useState('');
  const [primaryKey, setPrimaryKey] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [retrieveBranch, setRetrieveBranch] = useState('');
  useEffect(() => {
    setOnArchivedTab(activeTab !== 'archivedItems');
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [pdlModalSubmitted])

  const fetchData = async () => {
    try{
      let params = []
      const bjmpBranch = localStorage.getItem('bjmp-branch');
        if (bjmpBranch !== 'BJMPRO-III Main Office') {
            params.push(['br', bjmpBranch]);
        }
      const rawData = await fetchDataWrapper(activeTab === "pdlList" ? 'get-pdls' : 'get-archived-pdls', params);
      const transformedData = rawData.map(data => ({
        dbpk: data['pk'],
        pk: data['pdl-id'],
        name: `${(data['pdl-last-name']).toUpperCase()}, ${data['pdl-first-name']} ${data['pdl-middle-name']}`,
        balance: parseFloat(data['pdl-balance']).toFixed(2),
        bjmpBranch: data['pdl-branch-location'],
        type: (() => {
          const types = [];
          if (parseInt(data['pdl-age']) > 65) types.push('Senior');
          if (data['pdl-gender'] === 'Other' && data['pdl-other-gender']) types.push('LGBT');
          if (data['pdl-medical-condition']) types.push('PWD');
          return types.length ? types : ['Regular'];
        })(),
        isArchived: data['is-archived'],
      }))
      setTableData(transformedData)
    } catch (error){
      console.error('Error fetching data: ', error);
    }
  }
  
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
            headerName: 'BJMP Unit',
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
              action: 'addPDLEntry',
              function: function(){
                setPDLModalOpen((prev) => !prev);
                setEdit(false);
                setArchive(false);
                setRetrieve(false);
                setDelete(false);
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
                setEdit(false);
                setArchive(true);
                setRetrieve(false);
                setDelete(false);
                setPdlId('');
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
                setEdit(false);
                setArchive(false);
                setRetrieve(true);
                setDelete(false);
                setPdlId('');
                setPrimaryKey('');
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
                setEdit(false);
                setArchive(false);
                setRetrieve(false);
                setDelete(true);
                setPdlId('');
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
        tableData: tableData || null,
        tableActions: [
          {
            actionName: 'View',
            actionIcon: 'fa-solid fa-eye fa-sm',
            actionFunctionality: {
              action: 'viewPDL',
              function: function(data, prim){
                navigate(`/pdl-profile?id=${data}&pk=${prim}`) ;
              }
            },
            forArchive: false
          },
          {
            actionName: 'Edit',
            actionIcon: 'fa-solid fa-pen-to-square fa-sm',
            actionFunctionality: {
              action: 'editPDL',
              function: function(data, prim){
                setPDLModalOpen((prev) => !prev);
                setEdit(true);
                setArchive(false);
                setRetrieve(false);
                setDelete(false);
                setPdlId(data);
                setPrimaryKey(prim);
                setSelectedRows([]);
              }
            },
            forArchive: false
          },
          {
            actionName: 'Archive',
            actionIcon: 'fa-solid fa-box-archive fa-sm',
            actionFunctionality: {
              action: 'archivePDL',
              function: function(data, prim){
                setArchiveModalOpen((prev) => !prev);
                setMethod('Single');
                setEdit(false);
                setArchive(true);
                setRetrieve(false);
                setDelete(false);
                setPdlId(data);
                setPrimaryKey(prim);
                setSelectedRows([]);
              }
            },
            forArchive: false
          },
          {
            actionName: 'Retrieve',
            actionIcon: 'fa-solid fa-rotate-left fa-sm',
            actionFunctionality: {
              action: 'retrievePDL',
              function: function(data, prim, branch){
                setRetrieveModalOpen((prev) => !prev);
                setMethod('Single');
                setEdit(false);
                setArchive(false);
                setRetrieve(true);
                setDelete(false);
                setPdlId(data);
                setPrimaryKey(prim);
                setRetrieveBranch(branch);
                setSelectedRows([]);
              }
            },
            forArchive: true
          },
          {
            actionName: 'Delete',
            actionIcon: 'fa-solid fa-trash fa-sm',
            actionFunctionality: {
              action: 'deletePDL',
              function: function(data, prim){
                setDeleteModalOpen((prev) => !prev);
                setMethod('Single');
                setEdit(false);
                setArchive(false);
                setRetrieve(false);
                setDelete(true);
                setPdlId(data);
                setPrimaryKey(prim);
                setSelectedRows([]);
              }
            },
            forArchive: true
          },
        ],
        noOfItemsInTable: TABLE_BIG_CONTENT,
        searchAvailable: true
    },
    
  ]
  const submissionDetails = 
    {
      title: isEdit ? `PDL ${EDIT_TITLE}!` : 
      isArchive ? `PDL ${ARCHIVE_TITLE}!` : isRetrieve ? `PDL ${RETRIEVE_TITLE}!` : isDelete ?  `PDL ${DELETE_TITLE}!` :  `PDL ${ADD_TITLE}!`,
      description: isEdit ?  `PDL ${EDIT_DESCRIPTION}!` : 
      isArchive ? `PDL ${ARCHIVE_DESCRIPTION}!` : isRetrieve ? `PDL ${RETRIEVE_DESCRIPTION}!` :
       isDelete ? `PDL ${DELETE_DESCRIPTION}!` : `PDL ${ADD_DESCRIPTION}!`
    }
  return (
    <>
    <div>
        <Helmet>
          <title>BJMP | PDLs</title>
        </Helmet>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TableTemplate 
          tableData={pdlTableData[0]} archived={onArchivedTab} setRows={setSelectedRows} actionSubmitted={isSuccessfulActionModalOpen}/>
        <PDLModal stateChecker={isPDLModalOpen} stateControl={() => setPDLModalOpen((prev) => !prev)} isEdit={isEdit}
        isSubmittedControl={() => setPdlModalSubmitted((prev) => !prev)} id={primaryKey} />
        <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)}
        isSubmitted={pdlModalSubmitted} isSubmittedControl={() => setPdlModalSubmitted((prev) => !prev)} actionTitle={submissionDetails.title} actionDescription={submissionDetails.description}
        />
        <ArchiveModal 
        stateChecker={isArchiveModalOpen} stateControl={() => setArchiveModalOpen((prev) => !prev)} 
        type={'PDL'} method={method} id={primaryKey} isSubmittedControl={() => setPdlModalSubmitted((prev) => !prev)} multipleIds={JSON.stringify(selectedRows)}/>
        <RetrieveModal stateChecker={isRetrieveModalOpen} stateControl={() => setRetrieveModalOpen((prev) => !prev)} 
        type={'PDL'} method={method} id={pdlId} isSubmittedControl={() => setPdlModalSubmitted((prev) => !prev)} prim={primaryKey} multipleIds={JSON.stringify(selectedRows)} branch={retrieveBranch}/>
        <DeleteModal stateChecker={isDeleteModalOpen} stateControl={() => setDeleteModalOpen((prev) => !prev)} 
        type={'PDL'} method={method} id={pdlId} isSubmittedControl={() => setPdlModalSubmitted((prev) => !prev)} prim={primaryKey} multipleIds={JSON.stringify(selectedRows)}/>

  </div>
    </>
    
  );
}

