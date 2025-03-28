import React, { useState } from "react";
import { TABLE_SMALL_CONTENT } from "../../../../../../constants";
import { TableTemplate } from "../../../../../../components";

export default function LowBalance(props){
    const {data} = props
    const lowBalanceData = [{
        tableIcon: 'fa-solid fa-wallet',
        tableName: 'Low Balance PDLs',
        hasPills: [false],
        tableHeaders: [
            {
              headerId: 'name',
              headerName: 'Name',
              hasFilter: true,
              hasLowHigh: false,
            },
            {
              headerId: 'balance',
              headerName: 'Balance',
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
            tableData={lowBalanceData[0]} archived={true} fromModal={true} isSmallTable={true}
        />
        </>)
}