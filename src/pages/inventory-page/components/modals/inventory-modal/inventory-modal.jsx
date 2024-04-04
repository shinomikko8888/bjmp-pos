import React, {useState, useRef, useEffect} from "react";
import { Modal, TableTemplate, Tabs } from "../../../../../components";
import '../../../../../styles/buttons/general.css'
import { BRANCHES } from "../../../../../constants";
import '../../../../../styles/modals/inventory-modal.css';
import { ArchiveModal, DeleteModal } from "../../../../../components/modals/util-modals";

export default function InventoryModal({stateChecker, stateControl, isEdit, isView}){
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [method, setMethod] = useState('');
    const tabs = [
      { label: "Profits", id: "stockProfits" },
      { label: "List of Instances", id: "listOfInstances" },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    useEffect(() => {
        setActiveTab(tabs[0].id)
    }, [stateChecker])

    const instanceTableData = [
        {
            tableIcon: 'fa-solid fa-box-open',
            tableName: 'List of Stock Instances',
            hasPills: [false],
            tableHeaders: [
                {
                    headerId: 'pk',
                    headerSecondaryID: 'instanceId',
                    headerName: 'Instance ID',
                    hasFilter: false,
                    hasLowHigh: true,
                },
                {
                    headerId: 'instanceDateAdded',
                    headerName: 'Date Added',
                    hasFilter: true,
                    hasLowHigh: true,
                },
                {
                    headerId: 'instanceExpiration',
                    headerName: 'Expiration Date',
                    hasFilter: true,
                    hasLowHigh: true,
                },
                {
                    headerId: 'instanceQuantity',
                    headerName: 'Quantity',
                    hasFilter: false,
                    hasLowHigh: true,
                },
                {
                    headerId: 'bjmpBranch',
                    headerName: 'BJMP Branch',
                    hasFilter: true,
                    hasLowHigh: false,
                },
            ],
            buttonsInTable:[
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
                    buttonName: 'Add Instance Entry',
                    buttonIcon: 'fa-regular fa-plus',
                    buttonFunctionality: {
                      action: 'addInstanceEntry',
                      function: function(){
                        alert('addInstanceEntry')
                      }
                    },
                    forArchive: false,
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
                    forArchive: false,
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
                  instanceDateAdded: '2024-02-20 15:18:00',
                  instanceExpiration: '2024-02-21',
                  instanceQuantity: 7,
                  bjmpBranch: 'Marilao Municipal Jail',
                },
                {
                    pk: '000002',
                    instanceDateAdded: '2024-02-21 15:18:00',
                    instanceExpiration: '2024-03-21',
                    instanceQuantity: 37,
                    bjmpBranch: 'Marilao Municipal Jail',
                },
                {
                    pk: '000003',
                    instanceDateAdded: '2024-02-22 15:18:00',
                    instanceExpiration: '2024-04-21',
                    instanceQuantity: 24,
                    bjmpBranch: 'Marilao Municipal Jail',
                  },
              ],
              tableActions:[
              {
                actionName: 'Edit',
                actionIcon: 'fa-solid fa-pen-to-square fa-sm',
                actionFunctionality: {
                  action: 'editPDL',
                  function: function(){
                    alert('1');
                  }
                },
                forArchive: false
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
                forArchive: false
              },
            ],
              noOfItemsInTable: 10,
        }
    ]
    const inventoryModalHeader = (
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className={`fa-solid ${isView ? 'fa-box' : 'fa-boxes-packing'}`}></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>{`${isView ? 'Stock Details' : `${isEdit ? 'Edit' : 'Create'} Instance`}`}</h6>
            </div>
        </div>
    );
    const inventoryModalBody = (
        <>
            <div className="row g-3 align-items-center mb-2">
                <div className="col-5 inventory-instance-border-right">
                    <img src="test" alt="Safeguard Logo" className="inventory-instance-image"/>
                    <label htmlFor="itemNo" className="col-form-label d-block">
                      <b>Item No.:</b> Item#000001
                    </label>
                    <label htmlFor="itemType" className="col-form-label d-block">
                      <b>Product Type:</b> Soap
                    </label>
                    <label htmlFor="itemName" className="col-form-label d-block">
                      <b>Product Name:</b> Safeguard
                    </label>
                    <label htmlFor="itemPrice" className="col-form-label d-block">
                      <b>Product Price:</b> {`₱${(20).toFixed(2)}`}
                    </label>
                    <label htmlFor="itemCateg" className="col-form-label d-block">
                      <b>Product Category:</b> Personal Hygiene Products
                    </label>
                    <label htmlFor="itemStatus" className="col-form-label d-block">
                      <b>Product Status:</b> Healthy, 50pcs left
                    </label>
                    <label htmlFor="itemBranch" className="col-form-label d-block">
                      <b>Product Branch Location:</b> Marilao Municipal Jail
                    </label>
                </div>
                <div className="col-7">
                    {!isEdit && !isView ? (<>
                    <div className="row g-2 align-items-center mb-1">
                            <div className="col-12">
                                <label htmlFor="instanceDate" className="col-form-label">
                                    Date Today:
                                </label>
                                <input
                                    type="date"
                                    id="instanceDate"
                                    name="instanceDate"
                                    className="form-control"
                                    style={{ boxShadow: "none" }}
                                    disabled
                                />
                                </div>
                    </div>
                    <div className="row g-2 align-items-center mb-1">
                        <div className="col-12">
                        <label htmlFor="instanceTime" className="col-form-label">
                            Time:
                        </label>
                        <input
                            type="time"
                            id="instanceTime"
                            name="instanceTime"
                            className="form-control"
                            style={{ boxShadow: "none" }}
                            disabled
                        />
                        </div>
                    </div>
                    <div className="row g-2 align-items-center mb-1">
                        <div className="col-12">
                        <label htmlFor="instanceExpiration" className="col-form-label">
                            Expiration Date:
                        </label>
                        <input
                            type="date"
                            id="instanceExpiration"
                            name="instanceExpiration"
                            className="form-control"
                            style={{ boxShadow: "none" }}
                        />
                        </div>
                    </div>
                    <div className="row g-2 align-items-center mb-1">
                        <div className="col-12">
                        <label htmlFor="instanceQuantity" className="col-form-label">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="instanceQuantity"
                            name="instanceQuantity"
                            className="form-control"
                            style={{ boxShadow: "none" }}
                            placeholder="Enter quantity"
                        />
                        </div>
                    </div>
                    </>)
                    : isView && !isEdit ? (
                    <>
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === 'stockProfits' && (<div>
                      Profits Tab
                    </div>)}
                    {activeTab === 'listOfInstances' && (<div>
                        <TableTemplate tableData={instanceTableData[0]} archived={true}/>
                    </div>)}      
                    </>) :
                    '' }
                </div>
            </div>
        </>
    );
    

    const inventoryModalFooter = (
        <>
            <div className="d-flex justify-content-end">
                <button type="button" className="link-btn" onClick={() => stateControl((prev) => !prev)}>
                    Discard
                    </button>
                <button type="button" className="main-btn">Submit</button>
            </div>
            
        </>
    )

    return (<>
    <Modal 
        headerContent={inventoryModalHeader} 
        bodyContent={inventoryModalBody} 
        footerContent={inventoryModalFooter} 
        stateChecker={stateChecker} 
        stateControl={stateControl}
        customWidth={isView ? '90%' : '45%'}
        customZIndex={20}
        />
        <DeleteModal 
            stateChecker={isDeleteModalOpen} stateControl={() => setDeleteModalOpen((prev) => !prev)} 
            type={'Instance'} method={method}/>
            </>
    )
}