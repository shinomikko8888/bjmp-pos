import React, { useEffect, useState } from "react";
import '../../../../../styles/buttons/pos.css'
import { DOMAIN } from "../../../../../constants";
import PosButtons from "./buttons";
import { fetchDataWrapper } from "../../../../../utils";
import { Pagination } from "../../../../../components";
export default function PosSelector(props){
    const {fetchCommodityData, commodityData, setErrorMessage} = props
    const [buttonData, setButtonData] = useState([]);
    const [activeButton, setActiveButton] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        let params = []
        const bjmpBranch = localStorage.getItem('bjmp-branch');
            if (bjmpBranch !== 'BJMPRO-III Main Office') {
                params.push(['br', bjmpBranch]);
            }
        const rawData = await fetchDataWrapper('get-items', params);
        const transformedData = rawData.map((data) => (
            {
            dbpk: data['pk'],
            pk: data['item-id'],
            productName: data['item-name'],
            productType: data['item-type'],
            category: data['item-category'],
            price: parseFloat(data['item-price']).toFixed(2),
            bjmpBranch: data['item-branch-location'],
            remStock: data['item-remaining-stock'],
            imageSrc: data['item-image'] ? data['item-image'].replace('../api/files/images/items/', '') : ''
        }));
        setButtonData(transformedData);
    };
    const rowsPerPage = 16
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = buttonData.slice(startIndex, startIndex + rowsPerPage);
    return(
        <>
            <div className='mx-2 pos-selector'>
                {currentData.map(data => (
                    <PosButtons key={data.pk} 
                    data={data} isActive={activeButton == data.pk} 
                    setActiveButton={setActiveButton} fetchCommodityData={fetchCommodityData}
                    commodityData={commodityData} setErrorMessage={setErrorMessage}/>
                ))}
                {Array.from({ length: rowsPerPage - currentData.length }).map((_, index) => (
                    <div key={`empty-${index}`} className='col-md-3 my-2 smooth'>
                        <div className="pos-empty-cell-small smooth"></div>
                    </div>
                ))}
            </div>
            <div className="pagination-container mt-2 d-flex align-items-center justify-content-center">
                <Pagination currentPage={currentPage} setCurrentPage={handlePageChange}
                 totalPages={Math.ceil(buttonData.length / rowsPerPage)} rowsPerPage={rowsPerPage} data={currentData} />
            </div>
            
        </> 
    )
}