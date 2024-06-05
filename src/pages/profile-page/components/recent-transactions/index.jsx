import React, { useEffect, useState } from "react";
import { DOMAIN, TABLE_MEDIUM_CONTENT, TABLE_SMALL_CONTENT } from "../../../../constants";
import { TableTemplate } from "../../../../components";
import { fetchDataWrapper } from "../../../../utils";

export default function RecentTransactions(props){
    const {pid, branchLocation} = props
    const [tableData, setTableData] = useState([])
    useEffect(() => {
      fetchData();
    }, [pid, branchLocation])
    const fetchData = async() => {
      try {
        const rawData = await fetchDataWrapper('get-transactions', [['pid', pid], ['br', branchLocation]]);

        const transformedData = rawData.map(data => ({
          dbpk: data['pk'],
          pk: data['transaction-id'],
          transactionDateAndTime: data['transaction-created-at'],
          transactionUser: data['transaction-user'],
          transactionType: data['transaction-type'],
          bjmpBranch: data['transaction-branch-location'],
          transactionAmount: parseFloat(data['transaction-amount']).toFixed(2),
          transactionPdl: data['transaction-pdl'],
          transactionReceiptLink: data['transaction-receipt'],
        }))
        setTableData(transformedData)
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    const recentTransactionData = [
        {
            tableIcon: 'fa-solid fa-receipt',
            tableName: "Recent Transactions",
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
                  headerId: 'transactionType',
                  headerName: 'Type',
                  hasFilter: true,
                  hasLowHigh: false,
                },
                
                {
                  headerId: 'transactionAmount',
                  headerName: 'Amount',
                  hasFilter: false,
                  hasLowHigh: true,
                },
              ],
            buttonsInTable: [
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
                        function: function(data,pk,link, type){
                          window.open(`${DOMAIN}/files/docs/receipts/${(type).toLowerCase()}/${link}`, '_blank');
                        }
                    },
                    forArchive: false
                    },
                ],
            noOfItemsInTable: TABLE_MEDIUM_CONTENT,
        }
        
    ]
    return(
        <>
            <TableTemplate tableData={recentTransactionData[0]} archived={true} isSmallTable={true}/>
        </>
    )
}