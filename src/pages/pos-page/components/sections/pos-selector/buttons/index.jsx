import React, { useState } from "react";
import { DOMAIN } from "../../../../../../constants";


export default function PosButtons(props){
    const {data} = props
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
    
      const handleClick = () => {
        setCircleStyle({
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scale(20)',
          transition: 'all .5s ease'
        });
        //onQtyContainerClick(index); // Call the callback to handle toggling qtyState
      };

    const imageContainerStyle = {
        width: '100%',
        position: 'relative',
    };

    const imageStyle = {
        width: '50%',
        objectFit: 'cover',
    };
    console.log(data);
    return(
        <>
            <div className='col-md-2' key={data.id}>
                <div className="pos-button-border" 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}>
                    <span className="price">Price: ₱{data.price}</span>
                    <span className="stock">Stock: {data.remStock == 0 ? 'No Stock' : `${data.remStock}pcs`}</span>
                    <div className="pos-button-image-container" style={imageContainerStyle}>
                        <img className="pos-button-image" src={`${DOMAIN}/files/images/items/${data.imageSrc}`} style={imageStyle} ></img>
                    </div>
                    <p className="text-muted">{data.category}</p>
                    <h6>{data.productType} - {data.productName}</h6>
                    <div className="pos-cursor-circle" style={circleStyle}></div>
                </div>
            </div>
        </>

    )
}