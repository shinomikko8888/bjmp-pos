import React, {useState, useRef, useEffect} from "react";
import { Modal, TableTemplate, Tabs } from "../../../../../components";
import '../../../../../styles/buttons/general.css'
import '../../../../../styles/modals/inventory-modal.css';
import { DeleteModal } from "../../../../../components/modals/util-modals";
import { fetchDataWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../../utils";
import { DOMAIN } from "../../../../../constants";
import InventoryForm from "./components/form";
import ProfitTab from "./components/profit-tab";
export default function InventoryModal(props){
    const {stateChecker, stateControl, isEdit, isView, isSubmittedControl, id, setEdit, setView, setDelete} = props
    const [errorMessage, setErrorMessage] = useState('');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [method, setMethod] = useState('');
    const [tableData, setTableData] = useState([]);
    const [itemData, setItemData] = useState({});
    const [imageSrcFromId, setImageSrcFromId] = useState(null);
    const [itemId, setItemId] = useState('');
    const [primaryKey, setPrimaryKey] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    ;
    const tabs = [
      { label: "List of Instances", id: "listOfInstances" },
      { label: "Profits", id: "stockProfits" },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    useEffect(() => {
      setTimeout(() => {
        setActiveTab(tabs[0].id)
      }, 500)
    }, [stateChecker])
    useEffect(() => {
      if(id){
        fetchItemData(); 
      }
    }, [id])
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    useEffect(() => {
      if(id && (activeTab === 'listOfInstances' || activeTab === 'archivedInstances')){
        fetchInstanceData();
      }
    }, [id, activeTab])
    const [formData, setFormData] = useState({
      'instance-type': '',
      'instance-name': '',
      'instance-date-time': `${formattedDate} ${formattedTime}`,
      'instance-expiration-date': '',
      'instance-remaining-stock': '',
      'action': '',
      'active-email': ''
    })
    const fetchItemData = async () => {
      try{
        let itemParams = [['id', id]];
        const bjmpBranch = localStorage.getItem('bjmp-branch');
    
        if (bjmpBranch !== 'BJMPRO-III Main Office') {
            itemParams.push(['br', bjmpBranch]);
        }
        
        const itemData = await fetchDataWrapper('get-item', itemParams);
        const itemImage = itemData['item-image'] ? itemData['item-image'].replace('../api/files/images/items/', '') : '';
        
        setItemData(itemData);
        setImageSrcFromId(itemImage);
      } catch (error){
        console.error('Error fetching item data: ', error);
      }
    }
    
    const fetchInstanceData = async () => {
      try{
        let instanceParams = [];
        const bjmpBranch = localStorage.getItem('bjmp-branch');
    
        if (bjmpBranch !== 'BJMPRO-III Main Office') {
            instanceParams.push(['br', bjmpBranch]);
        }
        
        if(itemData['item-type'] && itemData['item-name']) {
          instanceParams.push(['it', itemData['item-type']]);
          instanceParams.push(['in', itemData['item-name']]);
          instanceParams.push(['br', itemData['item-branch-location']]);
        }
        const instanceData = await fetchDataWrapper(activeTab === 'listOfInstances' ? 'get-instances' : 'get-archived-instances', instanceParams);
        const transformedData = instanceData.map(data => ({
          dbpk: data['pk'],
          pk: data['instance-id'],
          instanceDateAdded: data['instance-created-at'],
          instanceExpiration: data['instance-expiration-date'],
          instanceQuantity: data['instance-remaining-stock'],
          bjmpBranch: data['instance-branch-location'],
        }))
        setTableData(transformedData);
      } catch (error){
        console.error('Error fetching instance data: ', error);
      }
    }
    const handleSubmit = async (event) => {
      try {
          
          if (!isFormDataValid(formData)) {
              setErrorMessage('Please fill in all required fields');
              return;
          }
          const response = await handleSubmitWrapper(event, formData, true);
          if (response.success) {
              setErrorMessage('');
              stateControl((prev) => !prev)
              isSubmittedControl((prev) => !prev)
          } else {
            setErrorMessage(response.message || "System error"); 
          }
        } catch (error) {
          console.error('Error: ', error);
          setErrorMessage(`Error: ${error}`);
        }
  }
    const instanceTableData = [
        {
            tableIcon: 'fa-solid fa-box-open',
            tableName: `${activeTab === 'listOfInstances' ? 'List of' : 'Archived'} Stock Instances`,
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
                        setView();
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
                      function: function(data, prim){
                        setDeleteModalOpen((prev) => !prev);
                        setItemId('');
                        setPrimaryKey('');
                        setMethod('Multiple');
                        setDelete(true);
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
            tableData: tableData || null,
              tableActions:[
              {
                actionName: 'Delete',
                actionIcon: 'fa-solid fa-trash fa-sm',
                actionFunctionality: {
                  action: 'deletePDL',
                  function: function(data, prim){
                    setDeleteModalOpen((prev) => !prev);
                    setItemId(data);
                    setPrimaryKey(prim);
                    setSelectedRows([]);
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
                    <img src={`${DOMAIN}/files/images/items/${imageSrcFromId}`} alt={itemData['item-name'] || ''} className="inventory-instance-image"/>
                    <label htmlFor="itemNo" className="col-form-label d-block">
                      <b>Item No.:</b> Item#{itemData['item-id'] || ''}
                    </label>
                    <label htmlFor="itemType" className="col-form-label d-block">
                      <b>Product Type:</b> {itemData['item-type'] || ''}
                    </label>
                    <label htmlFor="itemName" className="col-form-label d-block">
                      <b>Product Name:</b> {itemData['item-name'] || ''}
                    </label>
                    <label htmlFor="itemPrice" className="col-form-label d-block">
                      <b>Product Price:</b> {`₱${parseFloat(itemData['item-price']).toFixed(2) || ''}`}
                    </label>
                    <label htmlFor="itemCateg" className="col-form-label d-block">
                      <b>Product Category:</b> {itemData['item-category'] || ''}
                    </label>
                    <label htmlFor="itemStatus" className="col-form-label d-block">
                      <b>Product Status: </b> 
                      {(() => {
                          const remainingStock = parseInt(itemData['item-remaining-stock']);
                          const criticalThreshold = parseInt(itemData['item-critical-threshold']);
                          const halfCriticalThreshold = Math.round(criticalThreshold / 2);

                          let productStatus = '';

                          if (remainingStock > criticalThreshold) {
                              productStatus = 'Healthy';
                          } else if (remainingStock === criticalThreshold || (remainingStock < criticalThreshold && remainingStock > halfCriticalThreshold)) {
                              productStatus = 'Critical';
                          } else if (remainingStock < halfCriticalThreshold && remainingStock !== 0) {
                              productStatus = 'Severe';
                          } else if (remainingStock === 0) {
                              productStatus = 'Unavailable';
                          } else {
                              productStatus = 'Unavailable';
                          }

                          return productStatus;
                      })()}, {itemData['item-remaining-stock'] || ''}pcs left
                    </label>
                    <label htmlFor="itemBranch" className="col-form-label d-block">
                      <b>Product Branch Location:</b> {itemData['item-branch-location'] || ''}
                    </label>
                </div>
                <div className="col-7">
                    {!isEdit && !isView ? (<>
                      <InventoryForm itemData={itemData} stateChecker={stateChecker} isView={isView} formattedDate={formattedDate} 
                      formattedTime={formattedTime} formData={formData} setFormData={setFormData}
                      />
                    </>)
                    : isView && !isEdit ? (
                    <>
                    <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === 'stockProfits' && (<div>
                      <ProfitTab/>
                    </div>)}
                    {(activeTab === 'listOfInstances' || activeTab === 'archivedInstances') && (
                    <div>
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
              <p className="error-message">{errorMessage}</p>
                <button type="button" className="link-btn" onClick={() => stateControl((prev) => !prev)}>
                    Discard
                    </button>
                <button type="button" className="main-btn" onClick={handleSubmit}>Submit</button>
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
            type={'Instance'} method={method} id={itemId} isSubmittedControl={isSubmittedControl} prim={primaryKey} multipleIds={JSON.stringify(selectedRows)}/> 
            </>
    )
}