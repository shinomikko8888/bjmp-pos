import React, { useEffect, useState } from "react";
import { TABLE_BIG_CONTENT, TABLE_MEDIUM_CONTENT, TABLE_SMALL_CONTENT } from "../../../../constants";
import { TableTemplate } from "../../../../components";
import { fetchDataWrapper } from "../../../../utils";

export default function PaabotCreditors(props){
    const {openLenderModal, setModifyControl, pid, branchLocation, isSuccessfulActionModalOpen, setCreditorId, setSelectedRows, isSubmitted} = props
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
      if (branchLocation !== undefined) {
          fetchData();
      }
    }, [branchLocation]);

    useEffect(() => {
      fetchData();
    }, [isSubmitted])


    const fetchData = async () => {
      try{
        let params= [['pid', pid], ['br', branchLocation]];

        const rawData = await fetchDataWrapper('get-lenders', params);
        const transformedData = rawData.map(data => ({
          dbpk: data['pk'],
          pk: data['lender-id'],
          lenderName: `${(data['lender-last-name']).toUpperCase()}, ${data['lender-first-name']} ${data['lender-middle-name']}`,
          lenderRelationship: data['lender-relationship'],
          isApproved: data['is-approved'] == 0 ? 'False' : 'True',
        }))
        setTableData(transformedData);
      } catch(error){
        console.error('Error fetching data: ', error);
      }
    }

    const creditorTableData = [
        {
            tableIcon: 'fa-solid fa-hand-holding-dollar',
            tableName: "'Paabot' Creditors List",
            hasPills: [false],
            tableHeaders: [
                {
                    headerId: 'pk',
                    headerSecondaryID: 'lenderId',
                    headerName: 'Creditor ID',
                    hasFilter: false,
                    hasLowHigh: true,
                },
                {
                    headerId: 'lenderName',
                    headerName: 'Creditor Name',
                    hasFilter: true,
                    hasLowHigh: false,
                },
                {
                    headerId: 'lenderRelationship',
                    headerName: 'Relationship',
                    hasFilter: false,
                    hasLowHigh: false,
                },
                {
                    headerId: 'isApproved',
                    headerName: 'Is Approved?',
                    hasFilter: false,
                    hasLowHigh: true,
                },
            ],
            buttonsInTable: [
                {
                    buttonName: 'Add Creditor',
                    buttonIcon: 'fa-regular fa-plus',
                    buttonFunctionality: {
                      action: 'addLender',
                      function: function(){
                        openLenderModal((prev) => !prev);
                        setModifyControl({
                          view: false,
                          edit: false,
                          add: true,
                        })
                      }
                    },
                    forArchive: false,
                  },
                  {
                    buttonName: 'Delete',
                    buttonIcon: 'fa-solid fa-trash',
                    buttonFunctionality: {
                      action: 'deleteMultiple',
                      typeOfArchive: 'Creditor',
                      function: function(){
                        alert('Delete')
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
            tableActions: [
                {
                  actionName: 'View ID',
                  actionIcon: 'fa-solid fa-eye fa-sm',
                  actionFunctionality: {
                    action: 'viewLender',
                    function: function(data, prim){
                      
                    }
                  },
                  forArchive: false
                },
                {
                  actionName: 'Edit',
                  actionIcon: 'fa-solid fa-pen-to-square fa-sm',
                  actionFunctionality: {
                    action: 'editLender',
                    function: function(data, prim){
                      openLenderModal((prev) => !prev);
                        setModifyControl({
                          view: false,
                          edit: true,
                          add: false,
                        })
                        setCreditorId(data);
                    }
                  },
                  forArchive: false
                },
                {
                    actionName: 'Delete',
                    actionIcon: 'fa-solid fa-trash fa-sm',
                    actionFunctionality: {
                      action: 'deleteLender',
                      function: function(data, prim){
                        
                      }
                    },
                    forArchive: false
                  },
                  {
                    actionName: 'Approve',
                    actionIcon: 'fa-solid fa-check',
                    actionFunctionality: {
                      action: 'approveLender',
                      function: function(data, prim){
                        alert('Approve Lender')
                      }
                    },
                    forArchive: true
                  },
                  {
                    actionName: 'Reject',
                    actionIcon: 'fa-solid fa-xmark',
                    actionFunctionality: {
                      action: 'rejectLender',
                      function: function(data, prim){
                        alert('Reject Lender')
                      }
                    },
                    forArchive: true
                  },
                
            ],
            noOfItemsInTable: TABLE_MEDIUM_CONTENT,
            searchAvailable: true
        }
    ]
    return(
        <>
            <TableTemplate tableData={creditorTableData[0]} 
            archived={true} setRows={setSelectedRows} actionSubmitted={isSuccessfulActionModalOpen}  isSmallTable={true}/>
        </>
    )
}