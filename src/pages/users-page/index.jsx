
import React, {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { TableTemplate, Tabs } from '../../components';
import { ArchiveModal, DeleteModal, RetrieveModal, SuccessfulActionModal } from '../../components/modals/util-modals';
import { fetchDataWrapper } from '../../utils';
import UserModal from './components/modals/user-modal';
import { UserProfileModal } from '../../components/navigation/top-navigation-bar/modals';

export default function User() {
  const tabs = [
    { label: "User List", id: "userList" },
    { label: "Archived Users", id: "archivedItems" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [isRetrieveModalOpen, setRetrieveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [userModalSubmitted, setUserModalSubmitted] = useState(false);
  const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
  const [isUserDetailsModalOpen, setUserDetailsModalOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isView, setView] = useState(false);
  const [isArchive, setArchive] = useState(false);
  const [isRetrieve, setRetrieve] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [method, setMethod] = useState('');
  const [onArchivedTab, setOnArchivedTab] = useState(activeTab !== 'archivedItems');
  const [tableData, setTableData] = useState([]);
  const [userId, setUserId] = useState('');
  const [primaryKey, setPrimaryKey] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    setOnArchivedTab(activeTab !== 'archivedItems');
    fetchData();
  }, [activeTab]);
  useEffect(() => {
    fetchData()
  }, [userModalSubmitted])

  const fetchData = async () => {
    try {
      const rawData = await fetchDataWrapper(activeTab === 'userList' ? 'get-users' : 'get-archived-users');
      const transformedData = rawData.map(data => ({
        dbpk: data['pk'],
        pk: data['user-id'],
        userName: `${(data['user-last-name']).toUpperCase()}, ${data['user-first-name']} ${data['user-middle-name']}`,
        userEmail: data['user-email'],
        bjmpBranch: data['user-branch-location'],
        userType: data['user-type'],
        isArchived: data['is-archived'],
        unselectable: data['user-email'] === localStorage.getItem('user-email') || data['user-type'] === 'Administrator' ? true : false
      }));
      
      setTableData(transformedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
  const userListData = [
    {
      tableIcon: 'fa-solid fa-user',
      tableName: onArchivedTab ? 'List of Users' : 'Archived Users',
      hasPills: [true,
      {
        pillTypes: ['Administrator', 'Jail Officer', 'Concessionaire Officer']
      }],
      tableHeaders: [
        {
          headerId: 'pk',
          headerSecondaryID: 'userId',
          headerName: 'User ID',
          hasFilter: false,
          hasLowHigh: true,
        },
        {
          headerId: 'userName',
          headerName: 'Name',
          hasFilter: true,
          hasLowHigh: false,
        },
        {
          headerId: 'userEmail',
          headerName: 'Email',
          hasFilter: true,
          hasLowHigh: false,
        },
        {
          headerId: 'bjmpBranch',
          headerName: 'BJMP Branch',
          hasFilter: true,
          hasLowHigh: false,
        },
        {
          headerId: 'userType',
          headerName: 'User Type',
          hasFilter: true,
          hasLowHigh: false,
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
          buttonName: 'Add User Entry',
          buttonIcon: 'fa-regular fa-plus',
          buttonFunctionality: {
            action: 'addUserEntry',
            function: function(){
              setUserModalOpen((prev) => !prev);
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
            function: function(){
              setArchiveModalOpen((prev) => !prev)
              setMethod('Multiple');
              setView(false);
              setEdit(false);
              setArchive(true);
              setRetrieve(false);
              setDelete(false);
              setUserId('');
            }
          },
          forArchive: false,
        },
        {
          buttonName: 'Retrieve',
          buttonIcon: 'fa-solid fa-rotate-left',
          buttonFunctionality: {
            action: 'retrieveMultiple',
            function: function(){
              setRetrieveModalOpen((prev) => !prev);
              setMethod('Multiple');
              setView(false);
              setEdit(false);
              setArchive(false);
              setRetrieve(true);
              setDelete(false);
              setUserId('');
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
              setView(false);
              setEdit(false);
              setArchive(false);
              setRetrieve(false);
              setDelete(true);
              setUserId('');
              
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
          action: 'viewUser',
          function: function(data){
            setUserDetailsModalOpen((prev) => !prev);
            setView(true);
            setEdit(false);
            setArchive(false);
            setRetrieve(false);
            setDelete(false);
            setUserId(data);
            setSelectedRows([]);
          }
        },
        forArchive: false
      },
      {
        actionName: 'Edit',
        actionIcon: 'fa-solid fa-pen-to-square fa-sm',
        actionFunctionality: {
          action: 'editUser',
          function: function(data){
            setUserModalOpen((prev) => !prev);
            setView(false);
            setEdit(true);
            setArchive(false);
            setRetrieve(false);
            setDelete(false);
            setUserId(data);
            setSelectedRows([]);
          },
        },
        forArchive: false
      },
      {
        actionName: 'Archive',
        actionIcon: 'fa-solid fa-box-archive fa-sm',
        actionFunctionality: {
          action: 'archiveUser',
          function: function(data){
            setArchiveModalOpen((prev) => !prev);
            setMethod('Single');
            setView(false);
            setEdit(false);
            setArchive(true);
            setRetrieve(false);
            setDelete(false);
            setUserId(data);
            setSelectedRows([]);
          }
        },
        forArchive: false
      },
      {
        actionName: 'Retrieve',
        actionIcon: 'fa-solid fa-rotate-left fa-sm',
        actionFunctionality: {
          action: 'retrieveUser',
          function: function(data, prim){
            setRetrieveModalOpen((prev) => !prev);
            setMethod('Single');
            setView(false);
            setEdit(false);
            setArchive(false);
            setRetrieve(true);
            setDelete(false);
            setUserId(data);
            setPrimaryKey(prim);
            setSelectedRows([]);
          }
        },
        forArchive: true
      },
      {
        actionName: 'Delete',
        actionIcon: 'fa-solid fa-trash fa-sm',
        actionFunctionality: {
          action: 'deleteUser',
          function: function(data){
            setDeleteModalOpen((prev) => !prev);
            setMethod('Single');
            setView(false);
            setEdit(false);
            setArchive(false);
            setRetrieve(false);
            setDelete(true);
            setUserId(data);
            setSelectedRows([]);
          }
        },
        forArchive: true
      },
    ],
    noOfItemsInTable: 20,
    }
  ]
  const submissionDetails = 
    {
      title: isEdit ? 'User Edited!' : 
      isArchive ? 'User Archived!' : isRetrieve ? 'User Retrieved!' : isDelete ? 'User Deleted!' : 'User Added!',
      description: isEdit ? 'User entry has been edited!' : 
      isArchive ? 'User has been archived!' : isRetrieve ? 'User entry has been retrieved!' : isDelete ? 'User entry has been deleted!' : 'User entry has been added!'
    }
  return (
    <>
      <div>
        <Helmet>
          <title>BJMP | User List</title>
        </Helmet>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TableTemplate tableData={userListData[0]} archived={onArchivedTab} setRows={setSelectedRows} actionSubmitted={isSuccessfulActionModalOpen}/>
        <UserModal stateChecker={isUserModalOpen} stateControl={() => setUserModalOpen((prev) => !prev)} 
        isEdit={isEdit} isSubmittedControl={() => setUserModalSubmitted((prev) => !prev) } id={userId}/>
        <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)}
        isSubmitted={userModalSubmitted} isSubmittedControl={() => setUserModalSubmitted((prev) => !prev)} actionTitle={submissionDetails.title} actionDescription={submissionDetails.description}/>
        <UserProfileModal stateChecker={isUserDetailsModalOpen} stateControl={() => setUserDetailsModalOpen((prev) => !prev)} userId={userId}/>
        <ArchiveModal 
        stateChecker={isArchiveModalOpen} stateControl={() => setArchiveModalOpen((prev) => !prev)} 
        type={'User'} method={method} id={userId} isSubmittedControl={() => setUserModalSubmitted((prev) => !prev)} multipleIds={JSON.stringify(selectedRows)}/>
        <RetrieveModal stateChecker={isRetrieveModalOpen} stateControl={() => setRetrieveModalOpen((prev) => !prev)} 
        type={'User'} method={method} id={userId} isSubmittedControl={() => setUserModalSubmitted((prev) => !prev)} prim={primaryKey} multipleIds={JSON.stringify(selectedRows)}/>
        <DeleteModal stateChecker={isDeleteModalOpen} stateControl={() => setDeleteModalOpen((prev) => !prev)} 
        type={'User'} method={method} id={userId} isSubmittedControl={() => setUserModalSubmitted((prev) => !prev)} prim={primaryKey} multipleIds={JSON.stringify(selectedRows)}/>
      </div>
    </>
  );
}

