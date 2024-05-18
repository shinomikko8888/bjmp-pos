import React from "react";
import { lineChartData, lineChartOptions } from "../../../../../../utils/data-management/chart-data";
import { ChartTemplate } from "../../../../../../components";

export default function ProfitTab(props) {
    const chartData = [
        {   
            chartCtx: 'profit',
            chartIcon: 'fa-solid fa-coins',
            chartName: 'Stock Profits',
            chartType: 'line',
            chartSelect: [
                { label: 'This Month', id: 0 },
                { label: 'This Year', id: 1 },
                { label: 'All Time', id: 2 }
            ],
            chartData: [lineChartData(), lineChartData(), lineChartData()],
            chartOptions: [lineChartOptions(), lineChartOptions(), lineChartOptions()],
        },
    ]
    return (
        <>
            <ChartTemplate data={chartData[0]}/>
        </>
    )

}