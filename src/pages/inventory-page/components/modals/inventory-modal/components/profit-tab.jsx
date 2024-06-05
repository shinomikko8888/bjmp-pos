import React from "react";
import { lineChartData, lineChartOptions } from "../../../../../../utils/data-management/chart-data";
import { ChartTemplate } from "../../../../../../components";

export default function ProfitTab(props) {
    const chartData = [
        {   
            chartCtx: 'profitModal',
            chartIcon: 'fa-solid fa-coins',
            chartName: 'Stock Profits',
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