import React from "react";
import { TABLE_SMALL_CONTENT } from "../../../../../../constants";
import { TableTemplate } from "../../../../../../components";

export default function PopularItems(props){
    const {data} = props
    const lowStockedData = [{
        tableIcon: 'fa-solid fa-fire',
        tableName: 'Popular Items',
        hasPills: [false],
        tableHeaders: [
            {
              headerId: 'productName',
              headerName: 'Product',
              hasFilter: true,
              hasLowHigh: false,
            },
            {
              headerId: 'sold',
              headerName: 'Sold',
              hasFilter: false,
              hasLowHigh: true,
            },
          ],
          buttonsInTable: [ //Buttons that are in Table
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
        tableData: data || null,
        tableActions: [],
        noOfItemsInTable: TABLE_SMALL_CONTENT,
    }]

    return(<>
        <TableTemplate 
            tableData={lowStockedData[0]} archived={true} fromModal={true} isSmallTable={true}
        />
        </>)
}