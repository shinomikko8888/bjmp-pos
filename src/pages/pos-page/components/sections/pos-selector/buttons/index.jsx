import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../../../../../constants";
import { handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../../../utils";


export default function PosButtons(props){
    const {data, isActive, setActiveButton, fetchCommodityData, commodityData, setErrorMessage} = props
    const [formData, setFormData] = useState({
      "commodity-item-id": '',
      "commodity-type": '',
      "commodity-name": '',
      "commodity-remaining-stock": '',
      "commodity-price": '',
      "commodity-branch-location": '',
      "commodity-image": '',
      "action": 'add-commodity',
      "active-email": localStorage.getItem('user-email'),
  });

  useEffect(() => {
      setFormData(prevFormData => ({
          ...prevFormData,
          "active-email": localStorage.getItem('user-email'),
      }));
  }, []);

  const handleSubmit = async (event, updatedFormData) => {
      try {
          await handleSubmitWrapper(event, updatedFormData, true);
          fetchCommodityData();
      } catch (error) {
          console.error('Error: ', error);
      }
  };
    
    const [circleStyle, setCircleStyle] = useState({
        left: 0,
        top: 0,
        transform: 'translate(-50%, -50%) scale(0)',
      });
      const [lastCursorPosition, setLastCursorPosition] = useState({
        left: 0,
        top: 0,
      });
      const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        setCircleStyle({
          left: `${Math.min(rect.width, Math.max(0, x))}px`,
          top: `${Math.min(rect.height, Math.max(0, y))}px`,
          transform: 'translate(-50%, -50%) scale(2)',
        });
    
        setLastCursorPosition({
          left: event.clientX,
          top: event.clientY,
        });
      };
      const handleMouseLeave = () => {
        setCircleStyle({
          left: `${lastCursorPosition.left}px`,
          top: `${lastCursorPosition.top}px`,
          transform: 'translate(-50%, -50%) scale(0)',
        });
      };
    
      const handleClick = (event) => { 
        const commodityItem = commodityData.find(item => item['commodity-item-id'] === data.pk);
        const currentQuantity = commodityItem ? commodityItem['commodity-quantity'] : 0;
        if (parseInt(currentQuantity) >= parseInt(data.remStock)) {
            setErrorMessage('Exceeding available stock. Please restock the item or choose another item');
            return;
        }
        setErrorMessage('');
        setCircleStyle({
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scale(20)',
          transition: 'all .5s ease'
        });
        /*if (!isActive) {
          setActiveButton(data.pk); 
        }*/
        const updatedFormData = {
          ...formData,
          "commodity-item-id": data.dbpk || '',
          "commodity-type": data.productType || '',
          "commodity-name": data.productName || '',
          "commodity-remaining-stock": data.remStock || '',
          "commodity-branch-location": data.bjmpBranch || '',
          "commodity-price": data.price || '',
          "commodity-image": data.imageSrc || '',
      };

        setFormData(updatedFormData);
        handleSubmit(event, updatedFormData);
      };

   
    return(
        <>
            <div className="col-md-3 smooth my-1" key={data.id}>
                <div className="pos-button-border" 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}>
                  <div className={`pos-button-image-container mt-2`} >
                        <img className="pos-button-image" src={`${DOMAIN}/files/images/items/${data.imageSrc}`} width={80} height={80}></img>
                      </div>
                      <p className="text-muted">{data.category}</p>
                      <h6 className="m-0">{data.productType} - {data.productName}</h6>
                      <p className="mb-2">₱{data.price} - {data.remStock == 0 ? 'No Stock' : `${data.remStock}pcs`}</p>
                  <div className="pos-cursor-circle" style={circleStyle}></div>
                    { /*isActive ? (<>
                      <div className={`py-${'3'/*!listExtend ? '3' : '4'} px-4 my-4`}>
                        <input type="text" id="commodity-quantity" name="commodity-quantity" onChange={handleChange}
                            className="form-control pos-button-input mt-2" style={{ boxShadow: 'none' }} placeholder="Enter quantity" />
                        <div className="row mt-2 mb-2 pos-button-container flex-column flex-md-row">
                            <div className="col-12 col-md-6 d-flex justify-content-center mb-2 mb-md-0">
                                <button className="link-btn px-3 py-2 w-100" onClick={() => setActiveButton(null)}>Discard</button>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <button className="main-btn px-3 py-2 w-100">Add</button>
                            </div>
                        </div>
                      </div>
                      
                    </>) : (<>
                      <div className={`pos-button-image-container mt-${/*listExtend ? '4' : '3' '3'}`} style={imageContainerStyle}>
                        <img className="pos-button-image" src={`${DOMAIN}/files/images/items/${data.imageSrc}`} style={imageStyle} ></img>
                      </div>
                      <p className="text-muted">{data.category}</p>
                      <h6 className="m-0">{data.productType} - {data.productName}</h6>
                      <p className={/*listExtend ? 'mb-2' : 'mb-3''mb-2'}>₱{data.price} - {data.remStock == 0 ? 'No Stock' : `${data.remStock}pcs`}</p>
                      <div className="pos-cursor-circle" style={circleStyle}></div>
                    </>)

                    */}
                    
                </div>
            </div>
        </>

    )
}