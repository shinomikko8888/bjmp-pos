
import React, {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { TableTemplate, Tabs } from '../../components';
import { ArchiveModal, DeleteModal, RetrieveModal, SuccessfulActionModal } from '../../components/modals/util-modals';
import { InventoryModal, StockModal } from './components';
import { fetchDataWrapper } from '../../utils';
import { ADD_DESCRIPTION, ADD_TITLE, ARCHIVE_DESCRIPTION, ARCHIVE_TITLE, DELETE_DESCRIPTION, DELETE_TITLE, EDIT_DESCRIPTION, EDIT_TITLE, RETRIEVE_DESCRIPTION, RETRIEVE_TITLE, TABLE_BIG_CONTENT } from '../../constants';

export default function Inventory() {
  
  const tabs = [
    { label: "Stock Management", id: "stockManagement" },
    { label: "Archived Stocks", id: "archivedItems" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [onArchivedTab, setOnArchivedTab] = useState(activeTab !== 'archivedItems')
  const [isStockModalOpen, setStockModalOpen] = useState(false);
  const [isInventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [isRetrieveModalOpen, setRetrieveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
  const [itemModalSubmitted, setItemModalSubmitted] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isView, setView] = useState(false);
  const [isArchive, setArchive] = useState(false);
  const [isInstance, setInstance] = useState(false);
  const [isRetrieve, setRetrieve] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [method, setMethod] = useState('');
  const [tableData, setTableData] = useState([]);
  const [optionData, setOptionData] = useState([]);
  const [itemId, setItemId] = useState('');
  const [primaryKey, setPrimaryKey] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    setOnArchivedTab(activeTab !== 'archivedItems');
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [itemModalSubmitted])

  const fetchData = async () => {
    try{
      let params = []
      const bjmpBranch = localStorage.getItem('bjmp-branch');
        if (bjmpBranch !== 'BJMPRO-III Main Office') {
            params.push(['br', bjmpBranch]);
        }
      const rawData = await fetchDataWrapper(activeTab === "stockManagement" ? 'get-items' : 'get-archived-items', params);
      const transformedData = rawData.map(data => ({
        dbpk: data['pk'],
        pk: data['item-id'],
        product: `${data['item-name']} (${data['item-type']})`,
        category: data['item-category'],
        price: parseFloat(data['item-price']).toFixed(2),
        bjmpBranch: data['item-branch-location'],
        status: (() => {
          const remainingStock = parseInt(data['item-remaining-stock']);
          const criticalThreshold = parseInt(data['item-critical-threshold']);
          const halfCriticalThreshold = Math.round(criticalThreshold / 2);

          if (remainingStock > criticalThreshold) return 'Healthy';
          else if (remainingStock === criticalThreshold || (remainingStock < criticalThreshold && remainingStock > halfCriticalThreshold)) return 'Critical';
          else if (remainingStock < halfCriticalThreshold && remainingStock !== 0) return 'Severe';
          else if (remainingStock === 0) return 'Unavailable';
          else return 'Unavailable';
        })(),
        remStock: data['item-remaining-stock'],
        isArchived: data['is-archived'],
      }))
      const optData = rawData.map(data => ({
        typeOptions: data['item-type'],
        categoryOptions: data['item-category']
      }))
      setTableData(transformedData)
      setOptionData(optData)
    } catch (error){
      console.error('Error fetching data: ', error);
    }
  }
  
  const stockTableData = [
    {
      tableIcon: 'fa-solid fa-boxes',
      tableName: onArchivedTab ? 'List of Stocks' : 'Archived Stocks',
      hasPills: [true,
        {
          pillTypes: ['Healthy', 'Critical', 'Severe', 'Unavailable']
        }
      ],
      tableHeaders: [
        {
          headerId: 'pk',
          headerSecondaryID: 'stockId',
          headerName: 'Stock ID',
          hasFilter: false,
          hasLowHigh: true,
        },
        {
          headerId: 'product',
          headerName: 'Product',
          hasFilter: true,
          hasLowHigh: false,
        },
        {
          headerId: 'category',
          headerName: 'Category',
          hasFilter: true,
          hasLowHigh: false,
        },
        {
          headerId: 'price',
          headerName: 'Price',
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
          headerId: 'status',
          headerName: 'Status',
          hasFilter: true,
          hasLowHigh: true,
        },
      ],
      buttonsInTable: [
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
          buttonName: 'Add Stock Entry',
          buttonIcon: 'fa-regular fa-plus',
          buttonFunctionality: {
            action: 'addStockEntry',
            function: function(){
              setStockModalOpen((prev) => !prev);
              setView(false);
              setEdit(false);
              setArchive(false);
              setRetrieve(false);
              setInstance(false);
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
            typeOfArchive: 'Stock',
            function: function(data, prim){
              setArchiveModalOpen((prev) => !prev)
              setView(false);
              setEdit(false);
              setArchive(true);
              setRetrieve(false);
              setInstance(false);
              setDelete(false);
              setItemId('');
              setPrimaryKey('');
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
            typeOfArchive: 'Stock',
            function: function(data, prim){
              setRetrieveModalOpen((prev) => !prev);
              setView(false);
              setEdit(false);
              setArchive(false);
              setRetrieve(true);
              setInstance(false);
              setDelete(false);
              setItemId('');
              setPrimaryKey('');
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
            typeOfArchive: 'Stock',
            function: function(data, prim){
              setDeleteModalOpen((prev) => !prev);
              setView(false);
              setEdit(false);
              setArchive(false);
              setRetrieve(false);
              setInstance(false);
              setDelete(true);
              setItemId('');
              setPrimaryKey('');
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
      tableData: tableData || null,
      tableActions:[{
        actionName: 'View',
        actionIcon: 'fa-solid fa-eye fa-sm',
        actionFunctionality: {
          action: 'viewStock',
          function: function(data, prim){
            setInventoryModalOpen((prev) => !prev);
            setView(true);
            setEdit(false);
            setArchive(false);
            setInstance(false);
            setRetrieve(false);
            setDelete(false);
            setItemId(data);
            setPrimaryKey(prim);
            setSelectedRows([]);
            
          }
        },
        forArchive: false
      },
      {
        actionName: 'Edit',
        actionIcon: 'fa-solid fa-pen-to-square fa-sm',
        actionFunctionality: {
          action: 'editItem',
          function: function(data, prim){
            setStockModalOpen((prev) => !prev);
            setView(false);
            setEdit(true);
            setArchive(false);
            setInstance(false);
            setRetrieve(false);
            setDelete(false);
            setItemId(data);
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
          action: 'archiveItem',
          function: function(data, prim){
            setArchiveModalOpen((prev) => !prev);
            setView(false);
            setEdit(false);
            setArchive(true);
            setRetrieve(false);
            setInstance(false);
            setDelete(false);
            setItemId(data);
            setPrimaryKey(prim);
            setSelectedRows([]);
            setMethod('Single');
          }
        },
        forArchive: false
      },
      {
        actionName: 'Create Instance',
        actionIcon: 'fa-solid fa-truck-ramp-box fa-sm',
        actionFunctionality: {
          action: 'createInstance',
          function: function(data, prim){
            setInventoryModalOpen((prev) => !prev);
            setView(false);
            setEdit(false);
            setArchive(false);
            setRetrieve(false);
            setInstance(true);
            setDelete(false);
            setItemId(data);
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
          action: 'retrieveItem',
          function: function(data, prim){
            setRetrieveModalOpen((prev) => !prev);
            setView(false);
            setEdit(false);
            setArchive(false);
            setRetrieve(true);
            setInstance(false);
            setDelete(false);
            setItemId(data);
            setPrimaryKey(prim);
            setSelectedRows([]);
            setMethod('Single');
          }
        },
        forArchive: true
      },
      {
        actionName: 'Delete',
        actionIcon: 'fa-solid fa-trash fa-sm',
        actionFunctionality: {
          action: 'deleteItem',
          function: function(data, prim){
            setDeleteModalOpen((prev) => !prev);
            setView(false);
            setEdit(false);
            setArchive(false);
            setRetrieve(false);
            setInstance(false);
            setDelete(true);
            setItemId(data);
            setPrimaryKey(prim);
            setSelectedRows([]);
            setMethod('Single');
          }
        },
        forArchive: true
      },
    ],
    noOfItemsInTable: TABLE_BIG_CONTENT,
    searchAvailable: true
    }
  ]
  const submissionDetails = 
  {
    title: isEdit ? `Item ${EDIT_TITLE}!` : 
    isArchive ? `Item ${ARCHIVE_TITLE}!` : isRetrieve ? `Item ${RETRIEVE_TITLE}!` : isDelete ?  `Item ${DELETE_TITLE}!` :  `Item ${ADD_TITLE}!`,
    description: isEdit ?  `Item ${EDIT_DESCRIPTION}!` : 
    isArchive ? `Item ${ARCHIVE_DESCRIPTION}!` : isRetrieve ? `Item ${RETRIEVE_DESCRIPTION}!` :
     isDelete ? `Item ${DELETE_DESCRIPTION}!` : `Item ${ADD_DESCRIPTION}!`
  }
  return (<>
    <div>
      <Helmet>
        <title>BJMP | Inventory</title>
      </Helmet>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <TableTemplate 
          tableData={stockTableData[0]} archived={onArchivedTab} setRows={setSelectedRows} actionSubmitted={isSuccessfulActionModalOpen}/>
        <InventoryModal stateChecker={isInventoryModalOpen} stateControl={() => setInventoryModalOpen((prev) => !prev)} isEdit={isEdit} isView={isView}
        isSubmittedControl = {() => setItemModalSubmitted((prev) => !prev)} id={itemId} setEdit={() => setEdit((prev) => !prev)} setView={() => setView((prev) => !prev)} setDelete={(prev) => !prev}/>
        <StockModal stateChecker={isStockModalOpen} stateControl={() => setStockModalOpen((prev) => !prev)} isEdit={isEdit} 
        isSubmittedControl = {() => setItemModalSubmitted((prev) => !prev)} id={itemId} optionData={optionData}/>
        <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)} isSubmitted={itemModalSubmitted}
        isSubmittedControl={() => setItemModalSubmitted((prev) => !prev)} actionTitle={submissionDetails.title} actionDescription={submissionDetails.description}/>
        <ArchiveModal 
        stateChecker={isArchiveModalOpen} stateControl={() => setArchiveModalOpen((prev) => !prev)} 
        type={'Item'} method={method} id={itemId} isSubmittedControl={() => setItemModalSubmitted((prev) => !prev)} multipleIds={JSON.stringify(selectedRows)} />
        <RetrieveModal stateChecker={isRetrieveModalOpen} stateControl={() => setRetrieveModalOpen((prev) => !prev)} 
        type={'Item'} method={method} id={itemId} isSubmittedControl={() => setItemModalSubmitted((prev) => !prev)} prim={primaryKey} multipleIds={JSON.stringify(selectedRows)}/>
        <DeleteModal stateChecker={isDeleteModalOpen} stateControl={() => setDeleteModalOpen((prev) => !prev)} 
        type={'Item'} method={method} id={itemId} isSubmittedControl={() => setItemModalSubmitted((prev) => !prev)} prim={primaryKey} multipleIds={JSON.stringify(selectedRows)} />
    </div>
  </>
  );
}

