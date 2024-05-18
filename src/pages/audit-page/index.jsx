
import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { TableTemplate, Tabs } from '../../components';
import { descriptionCreator, fetchDataWrapper } from '../../utils';
import { LogModal } from './components';
import { TABLE_BIG_CONTENT } from '../../constants';

export default function Audit() {
  const tabs = [
    { label: "Transaction History", id: "transactionHistory" },
    { label: "Changelog", id: "changelog" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [tableData, setTableData] = useState([]);
  const [isLogModalOpen, setLogModalOpen] = useState(false);
  const [logId, setLogData] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const rawData = await fetchDataWrapper(activeTab === 'transactionHistory' ? 'get-transactions' : 'get-logs');
      
      if (rawData.length === 0) {
        setTableData([]);
        return;
      }
      const transformedData = rawData.map(data => {
        const descriptionCreator = () => {
          let description = `User ${data['log-user']} `;
          
          const formatFields = (fields) => {
          return Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join(', ');
          };
          switch(data['log-action']){
          case 'Create':
              description += 'has created an entry for ';
              break;
          case 'Edit':
              description += 'has edited an entry for ';
              break;
          case 'Archive':
              description += 'has archived an entry for ';
              break;
          case 'Retrieve':
              description += 'has retrieved an entry for ';
              break;
          case 'Delete':
              description += 'has deleted an entry for ';
              break;
          default:
              description += 'did something with an entry for ';
              break;
          }
          if (data['log-user-details'] !== null) { 
          description += `User#${data['log-user-details']['id']} `;    
          } else if (data['log-item-details'] !== null) {
          description += `Item# ${data['log-item-details']['id']} `;
          } else if (data['log-instance-details'] !== null) {
          description += `Instance# ${data['log-instance-details']['id']} `;
          } else if (data['log-pdl-details'] !== null) {
          description += `PDL# ${data['log-pdl-details']['id']} `;
          } else {
          description += 'some random entry in the database ';
          }
  
          if(data['log-reason']){
          description += `Reason: ${data['log-reason']}`;
          }
          return description;
      }
        const transactionData = {
          dbpk: data['pk'],
          pk: data['transaction-id'],
          transactionDateAndTime: data['transaction-created-at'],
          transactionUser: data['transaction-user'],
          transactionType: data['transaction-type'],
          bjmpBranch: data['transaction-branch-location'],
          transactionAmount: data['transaction-amount'],
          transactionPdl: data['transaction-pdl'],
        };
  
        const logData = {
          dbpk: data['pk'],
          pk: data['log-id'],
          changelogDateAndTime: data['log-date'],
          changelogDescription: descriptionCreator(),
          logEmail: data['log-user'],
          logAction: data['log-action'],
          logItem: data['log-item-details'],
          logPdl: data['log-pdl-details'],
          logInstance: data['log-instance-details'],
          logUser: data['log-user-details'],
          logReason: data['log-reason'],
        };
  
        const filterNullValues = (data) => {
          return Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== null && value !== undefined)
          );
        };
  
        return activeTab === 'transactionHistory' ? filterNullValues(transactionData) : filterNullValues(logData);
      });
  
      setTableData(transformedData.flat().filter(item => item !== null));
      
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  
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
      tableData: tableData || null,
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
      noOfItemsInTable: TABLE_BIG_CONTENT,
      searchAvailable: true
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
      tableData: tableData || null,
      tableActions: [
        {
          actionName: 'View',
          actionIcon: 'fa-solid fa-eye fa-sm',
          actionFunctionality: {
            action: 'viewTransaction',
            function: function(data){
              setLogModalOpen((prev) => !prev);
              setLogData(data);
            }
          },
          forArchive: false
        },
      ],
      noOfItemsInTable: TABLE_BIG_CONTENT,
      searchAvailable: true
      
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
        <LogModal stateChecker={isLogModalOpen} stateControl={() => setLogModalOpen((prev) => !prev)} id={logId} />
      </div>
    </>
  );
}

