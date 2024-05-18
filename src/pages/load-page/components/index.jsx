import React, { useState } from "react";
import { LoadTopRowPage1, PDLSelector } from "./page-1";
import { BalanceSelector, LoadTopRowPage2 } from "./page-2";
import { TABLE_BIG_CONTENT } from "../../../constants";
import { TableTemplate } from "../../../components";
import LoadDetails from "./modals/load-details";

export default function LoadForm(){
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoadDetailsModalOpen, setLoadDetailsModalOpen] = useState(false);
    const recentTransactionData = [
        {
            tableIcon: 'fa-solid fa-receipt',
            tableName: "PDL's Recent Transactions",
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
            tableData: [],
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
        }
        
    ]
    return(
        <>
            <div className="row load-form p-3">
                <div className={`col-${pageNumber === 1 ? '5' : '12'} load-container p-4`}>
                    <div className='row mt-1 d-flex align-items-center position-relative justify-content-center'>
                        <div className='row d-flex align-items-center position-relative '>
                            <div className='col-4 d-flex align-items-center mb-3'>
                                <i className='fa-solid fa-money-bill-wave'></i>
                                <h6 className='fw-bold fs-5 m-0 mx-2'>Load PDL</h6>
                            </div>
                            <div>
                                {pageNumber === 1 ? (
                                    <>
                                        <div className='row d-flex position-relative'>
                                            <LoadTopRowPage1/>
                                            <PDLSelector type='general'/>
                                        </div>
                                    </>
                                ) : pageNumber === 2 ? (
                                    <>
                                        <LoadTopRowPage2/>
                                        
                                    </>
                                ) : (
                                    setPageNumber(1)
                                )}
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                {pageNumber === 1 ? (
                    <div className="col-7">
                        <TableTemplate tableData={recentTransactionData[0]}/>
                    </div>
                ) : pageNumber === 2 ? (
                    <>
                        <div className="load-container p-4 mt-3 d-flex align-items-center justify-content-center">
                            <div className="col-5">
                                <PDLSelector type='old'/>
                            </div>
                            <div className="col-2 d-flex align-items-center justify-content-center h2">
                                <i className='fas fa-arrow-right'></i>
                            </div>
                            <div className="col-5">
                                <PDLSelector type='updated'/>
                            </div>
                        </div>
                        
                    </>
                        
                ) : (setPageNumber(1))
                    
                }
            </div>
            <div className={`d-flex align-items-center justify-content-end p-1 ${pageNumber === 1 && 'px-3'}`}>
                {
                    pageNumber !== 1 && (
                        <button className="link-btn" onClick={() => setPageNumber(1)}>Back</button>
                    )
                }
                {
                    (pageNumber === 1 || pageNumber === 2) && (
                        <button className="main-btn" onClick={pageNumber === 1 ? 
                            (() => setPageNumber(2)) :
                            (() => setLoadDetailsModalOpen((prev) => !prev))
                        }>{pageNumber !== 2 ? 'Next' : 'Submit'}</button>
                    )
                }
            </div>
            <LoadDetails stateChecker={isLoadDetailsModalOpen} stateControl={() => setLoadDetailsModalOpen((prev) => !prev)}/>
        </>
    )

}