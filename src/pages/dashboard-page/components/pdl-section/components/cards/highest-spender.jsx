import React from "react";
import { TABLE_SMALL_CONTENT } from "../../../../../../constants";
import { TableTemplate } from "../../../../../../components";

export default function HighestSpender(props){
    const {} = props
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
              headerName: 'Spending Total',
              hasFilter: false,
              hasLowHigh: true,
            },
          ],
          buttonsInTable: [ //Buttons that are in Table
          {
            buttonName: 'Generate Report', //Button Name
            buttonIcon: 'fa-regular fa-file', //Button Icon
            buttonFunctionality: {
              action: 'generateReport',
              function: function(){
                alert('generateReport')
              }
            }, //Button Functionality
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
        ],
        tableData: [] || null,
        tableActions: [],
        noOfItemsInTable: TABLE_SMALL_CONTENT,
    }]

    return(<>
        <TableTemplate 
            tableData={highestSpenderData[0]} archived={true} fromModal={true} isSmallTable={true}
        />
        </>)
}