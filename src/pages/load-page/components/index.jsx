import React, { useEffect, useState } from "react";
import { LoadTopRowPage1, PDLSelector } from "./page-1";
import { BalanceSelector, LoadTopRowPage2 } from "./page-2";
import { TABLE_BIG_CONTENT } from "../../../constants";
import { TableTemplate } from "../../../components";
import LoadDetails from "./modals/load-details";
import { fetchDataWrapper } from "../../../utils";
import { SuccessfulActionModal } from "../../../components/modals/util-modals";

export default function LoadForm(){
    const [pageNumber, setPageNumber] = useState(1);
    const [errorMessages, setErrorMessages] = useState({
        firstError: '',
        secondError: '',
    })
    const [isLoadDetailsModalOpen, setLoadDetailsModalOpen] = useState(false);
    const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resultValue, setResultValue] = useState('');
    const [loadData, setLoadData] = useState({
        'action': 'load-pdl',
        'active-email': localStorage.getItem('user-email')
    });
    const [pdlData, setPdlData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        setLoadData({
            'action': 'load-pdl',
            'active-email': localStorage.getItem('user-email')})
        setPageNumber(1);
    }, [isSubmitted])
    const fetchData =  async () => {
        try{
            const rawData = await fetchDataWrapper('get-pdls');
            const transformedData = rawData.map((data) => ({
                dbpk: data['pk'],
                pk: data['pdl-id'],
                name: `${(data['pdl-last-name']).toUpperCase()}, ${data['pdl-first-name']} ${data['pdl-middle-name']}`,
                balance: parseFloat(data['pdl-balance']).toFixed(2),
                bjmpBranch: data['pdl-branch-location'],
            }))
            setPdlData(transformedData);
        }
        catch (error){
            console.error('Error fetching data: ', error);
        }
    }

    const eraseData = (name) => {
        setLoadData({
            ...loadData,
            [`${name}`]: '',
        });
    }

    const handlePageChange = (page) => {
        if (page === 2) {
            if (loadData['pdl-data'] && loadData['loading-type']) {
                setPageNumber(2);
                setErrorMessages({
                    ...errorMessages,
                    firstError: '',
                    secondError: '',
                });
            } else {
                setErrorMessages({
                    ...errorMessages,
                    firstError: 'Please fill out all fields',
                });
            }
        } else if (page === 1) {
            if (loadData['pdl-data'] && loadData['loading-type'] && loadData['load-amount'] && loadData['pdl-creditor']) {
                setLoadDetailsModalOpen((prev) => !prev);
                setErrorMessages({
                    ...errorMessages,
                    secondError: '',
                });
            } else {
                setErrorMessages({
                    ...errorMessages,
                    secondError: 'Please fill out all fields',
                });
            }
        }
    };
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

    return (
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
                                            <LoadTopRowPage1 data={pdlData} loadData={loadData} setLoadData={setLoadData} eraseData={eraseData} />
                                            <PDLSelector type='general' pdlData={loadData['pdl-data'] || ''} />
                                        </div>
                                    </>
                                ) : pageNumber === 2 ? (
                                    <>
                                        <LoadTopRowPage2 loadData={loadData} setLoadData={setLoadData}  setErrorMessages={setErrorMessages}/>
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
                        <TableTemplate tableData={recentTransactionData[0]} />
                    </div>
                ) : pageNumber === 2 ? (
                    <>
                        <div className="load-container p-4 mt-3 d-flex align-items-center justify-content-center">
                            <div className="col-5">
                                <PDLSelector type='old' pdlData={loadData['pdl-data'] || ''} />
                            </div>
                            <div className="col-2 d-flex align-items-center justify-content-center h2">
                                <i className='fas fa-arrow-right'></i>
                            </div>
                            <div className="col-5">
                                <PDLSelector type='updated' pdlData={loadData['pdl-data'] || ''} loadAmount={loadData['load-amount'] || ''}/>
                            </div>
                        </div>
                    </>
                ) : (setPageNumber(1))}
            </div>
            <div className={`d-flex align-items-center justify-content-end p-1 ${pageNumber === 1 && 'px-3'}`}>
                <p className="error-message mx-3">{pageNumber === 1 ? errorMessages.firstError : errorMessages.secondError}</p>
                {
                    pageNumber !== 1 && (
                        <button className="link-btn" onClick={() => setPageNumber(1)}>Back</button>
                    )
                }
                {
                    (pageNumber === 1 || pageNumber === 2) && (
                        <button className="main-btn" onClick={pageNumber === 1 ?
                            () => handlePageChange(2) :
                            () => handlePageChange(1)
                        }>{pageNumber !== 2 ? 'Next' : 'Submit'}</button>
                    )
                }
            </div>
            <LoadDetails stateChecker={isLoadDetailsModalOpen} stateControl={() => setLoadDetailsModalOpen((prev) => !prev)} loadData={loadData}
            setLoadData={setLoadData} isSubmittedControl={() => setIsSubmitted((prev) => !prev)} setResultValue={setResultValue}/>
            <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)} 
            isSubmitted={isSubmitted} isSubmittedControl={() => setIsSubmitted((prev) => !prev)} actionTitle={'Load Transaction Complete!'} 
            actionDescription={`PDL's new balance is: ₱${resultValue}`}/>
        </>
    );
}