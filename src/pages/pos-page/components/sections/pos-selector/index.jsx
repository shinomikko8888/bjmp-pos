import React, { useEffect, useState } from "react";
import '../../../../../styles/buttons/pos.css'
import { DOMAIN } from "../../../../../constants";
import PosButtons from "./buttons";
import { fetchDataWrapper } from "../../../../../utils";
export default function PosSelector(props){
    const [buttonData, setButtonData] = useState([])
    useEffect(() => {
        fetchData();
        
    }, [])
    
    const fetchData = async () => {
        const rawData = await fetchDataWrapper('get-items');
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
    const emptyEntriesCount = Math.max(60 - buttonData.length, 0);
    return(
        <>
            <div className='row mx-2 d-flex align-items-center position-relative'>
                {buttonData.map(data => (
                    <PosButtons key={data.pk} data={data}/>
                ))}
                {Array.from({ length: emptyEntriesCount }).map((_, index) => (
                  <div key={`empty-${index}`} className='col-md-2'>
                    <div className="pos-empty-cell"></div>
                  </div>
                ))}
            </div>
        </> 
    )
}