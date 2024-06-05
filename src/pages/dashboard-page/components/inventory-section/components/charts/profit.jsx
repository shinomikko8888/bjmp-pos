import React from "react";
import { lineChartData, lineChartOptions } from "../../../../../../utils/data-management/chart-data";
import { ChartTemplate } from "../../../../../../components";

export default function ProfitOverview(props) {
    
    const chartData = [
        {   
            chartCtx: 'profit',
            chartIcon: 'fa-solid fa-coins',
            chartName: 'Branch Profits',
            chartType: 'line',
            chartSelector: [{
                isDate: true,
                hasBranch: true,
                dateDoesntHaveMonth: true,
                
              }]
        },
    ]
    return (
        <>
            <ChartTemplate data={chartData[0]}/>
        </>
    )
}