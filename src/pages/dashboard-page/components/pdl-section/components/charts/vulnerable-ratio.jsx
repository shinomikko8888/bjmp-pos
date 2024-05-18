import React from "react";
import { ChartTemplate } from "../../../../../../components";
import { pieChartData, pieChartOptions } from "../../../../../../utils/data-management/chart-data";

export default function VulnerableRatio(props){
    const chartData = [
        {   
            chartCtx: 'vulnerable',
            chartIcon: 'fa-solid fa-person-half-dress',
            chartName: 'Vulnerable Ratio',
            chartType: 'pie',
            chartData: [pieChartData()],
            chartOptions: [pieChartOptions()],
        },
    ]
    return (
        <>
            <ChartTemplate data={chartData[0]}/>
        </>
    )
}