
import React, {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { TableTemplate, Tabs } from '../../components';
import { ArchiveModal, DeleteModal, RetrieveModal } from '../../components/modals/util-modals';
import { InventoryModal, StockModal } from './components';

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
  const [isEdit, setEdit] = useState(false);
  const [isView, setView] = useState(false);
  const [method, setMethod] = useState('');
  useEffect(() => {
    setOnArchivedTab(activeTab !== 'archivedItems');
  }, [activeTab]);
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
            typeOfArchive: 'Stock',
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
            typeOfArchive: 'Stock',
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
            typeOfArchive: 'Stock',
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
      tableData: [
        {
          pk: '000001',
          product: 'Safeguard (Soap)',
          category: 'Personal Hygiene Products',
          price: (20).toFixed(2),
          bjmpBranch: 'Marilao Municipal Jail',
          status: 'Healthy',
          remStock: 50,
          isArchived: false,
          isPopular: false,
          isNew: true,
        },
        {
          pk: '000002',
          product: 'Hansel (Biscuit)',
          category: 'Consumables',
          price: (10).toFixed(2),
          bjmpBranch: 'Marilao Municipal Jail',
          status: 'Critical',
          remStock: 15,
          isArchived: false,
          isPopular: true,
          isNew: false,
        },
        {
          pk: '000003',
          product: 'Kleenex (Toilet Paper)',
          category: 'Personal Hygiene Products',
          price: (75).toFixed(2),
          bjmpBranch: 'Meycauayan City Jail',
          status: 'Healthy',
          remStock: 40,
          isArchived: false,
          isPopular: false,
          isNew: false,
        },
        {
          pk: '000004',
          product: 'CD (LazerDisc)',
          category: 'Entertainment',
          price: (150).toFixed(2),
          bjmpBranch: 'Dinalupihan Municipal Jail',
          status: 'Unavailable',
          remStock: 0,
          isArchived: true,
          isPopular: false,
          isNew: false,
        },
        
      ],
      tableActions:[{
        actionName: 'View',
        actionIcon: 'fa-solid fa-eye fa-sm',
        actionFunctionality: {
          action: 'viewStock',
          function: function(){
            setInventoryModalOpen((prev) => !prev);
            setEdit(false);
            setView(true);
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
            setStockModalOpen((prev) => !prev);
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
        actionName: 'Create Instance',
        actionIcon: 'fa-solid fa-truck-ramp-box fa-sm',
        actionFunctionality: {
          action: 'createInstance',
          function: function(){
            setInventoryModalOpen((prev) => !prev);
            setEdit(false);
            setView(false);
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
    }
  ]

  return (<>
    <div>
      <Helmet>
        <title>BJMP | Inventory</title>
      </Helmet>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <TableTemplate 
          tableData={stockTableData[0]} archived={onArchivedTab}/>
        <InventoryModal stateChecker={isInventoryModalOpen} stateControl={() => setInventoryModalOpen((prev) => !prev)} isEdit={isEdit} isView={isView}/>
        <StockModal stateChecker={isStockModalOpen} stateControl={() => setStockModalOpen((prev) => !prev)} isEdit={isEdit} />
        <ArchiveModal 
        stateChecker={isArchiveModalOpen} stateControl={() => setArchiveModalOpen((prev) => !prev)} 
        type={'Stock'} method={method}/>
        <RetrieveModal stateChecker={isRetrieveModalOpen} stateControl={() => setRetrieveModalOpen((prev) => !prev)} 
        type={'Stock'} method={method}/>
        <DeleteModal stateChecker={isDeleteModalOpen} stateControl={() => setDeleteModalOpen((prev) => !prev)} 
        type={'Stock'} method={method} />
    </div>
  </>
  );
}

