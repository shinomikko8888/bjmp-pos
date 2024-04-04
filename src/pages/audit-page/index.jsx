
import React, {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { TableTemplate, Tabs } from '../../components';

export default function Audit() {
  const tabs = [
    { label: "Transaction History", id: "transactionHistory" },
    { label: "Changelog", id: "Changelog" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  const auditLogData = [
    {
      tableIcon: 'fa-solid fa-receipt',
      tableName: 'Transaction History',
      hasPills: [false],
      tableHeaders:[
        {
          headerId: 'pk',
          headerSecondaryID: 'transactionNo',
          headerName: 'Transaction No.',
          hasFilter: false,
          hasLowHigh: true,
        },
        {
          headerId: 'transactionDateAndTime',
          headerName: 'Date and Time',
          hasFilter: true,
          hasLowHigh: true,
        },
        {
          headerId: 'transactionUser',
          headerName: 'Email',
          hasFilter: true,
          hasLowHigh: false,
        },
        {
          headerId: 'transactionType',
          headerName: 'Transaction Type',
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
          headerId: 'transactionAmount',
          headerName: 'Amount',
          hasFilter: false,
          hasLowHigh: true,
        },
        {
          headerId: 'transactionPdl',
          headerName: 'Involved PDL',
          hasFilter: false,
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
      ],
      tableData:[
        {
          pk: '000001',
          transactionDateAndTime: '2024-02-20 15:18:00',
          transactionUser: 'sketchynimbuss@gmail.com',
          transactionType: 'Load',
          bjmpBranch: 'Marilao Municipal Jail',
          transactionAmount: (16).toFixed(2),
          transactionPdl: '000001',
        },
        {
          pk: '000002',
          transactionDateAndTime: '2024-02-21 15:18:00',
          transactionUser: 'sketchynimbuss@gmail.com',
          transactionType: 'Purchase',
          bjmpBranch: 'Meycauayan City Jail',
          transactionAmount: (6).toFixed(2),
          transactionPdl: '000001',
        },
      ],
      tableActions: [
        {
          actionName: 'View',
          actionIcon: 'fa-solid fa-eye fa-sm',
          actionFunctionality: {
            action: 'viewTransaction',
            function: function(){
              alert("View");
            }
          },
          forArchive: false
        },
      ],
      noOfItemsInTable: 20,
    },
    {
      tableIcon: 'fa-solid fa-user-pen',
      tableName: 'Changelog',
      hasPills: [false],
      tableHeaders:[
        {
          headerId: 'pk',
          headerSecondaryID: 'changelogId',
          headerName: 'Log ID',
          hasFilter: false,
          hasLowHigh: true,
        },
        {
          headerId: 'changelogDateAndTime',
          headerName: 'Date and Time',
          hasFilter: true,
          hasLowHigh: true,
        },
        {
          headerId: 'changelogDescription',
          headerName: 'Description',
          hasFilter: false,
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
      ],
      tableData:[
        {
          pk: '000001',
          changelogDateAndTime: '2024-02-20 15:18:00',
          changelogDescription: 'User sketchynimbuss@gmail.com has edited an entry for PDL-000001',
        },
        {
          pk: '000002',
          changelogDateAndTime: '2024-02-21 15:18:00',
          changelogDescription: 'User sketchynimbuss@gmail.com has retrieved entry Item#000001 from the archive',
        },
      ],
      tableActions: [
        {
          actionName: 'View',
          actionIcon: 'fa-solid fa-eye fa-sm',
          actionFunctionality: {
            action: 'viewTransaction',
            function: function(){
              alert("View");
            }
          },
          forArchive: false
        },
      ],
      noOfItemsInTable: 20,
    }
  ]
  return (
    <>
      <div>
        <Helmet>
          <title>BJMP | Audit Trail</title>
        </Helmet>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TableTemplate tableData={auditLogData[activeTab === 'transactionHistory' ? 0 : 1]} archived={true}/>
      </div>
    </>
  );
}

