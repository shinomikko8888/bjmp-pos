import React from "react";
import { TABLE_SMALL_CONTENT } from "../../../../../../constants";
import { TableTemplate } from "../../../../../../components";

export default function HighestSpender(props){
    const {data} = props
    const highestSpenderData = [{
        tableIcon: 'fa-solid fa-dollar-sign',
        tableName: 'Highest Spender',
        hasPills: [false],
        tableHeaders: [
            {
              headerId: 'name',
              headerName: 'Name',
              hasFilter: true,
              hasLowHigh: false,
            },
            {
              headerId: 'spendingTotal',
              headerName: 'Total',
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
            tableData={highestSpenderData[0]} archived={true} fromModal={true} isSmallTable={true}
        />
        </>)
}