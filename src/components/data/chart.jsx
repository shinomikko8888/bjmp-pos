import React, { useEffect, useRef, useState } from "react";
import { Matrix } from '../../utils/data-management/chart-data/matrix'
import { Bar, Line, Pie } from "react-chartjs-2";
import { handleChangeWrapper } from "../../utils";
export default function ChartTemplate(props){
    const {data} = props
    const [selector, setSelector] = useState({
        'chart-option': ''
    });
    const [chartDataIndex, setChartDataIndex] = useState(0); // Track the index of chart data and options
    
    useEffect(() => {
        setSelector({
            'chart-option':  data.chartSelect ? (data.chartSelect[chartDataIndex] ? data.chartSelect[chartDataIndex].label : '') : ''
        })
    }, [])
    useEffect(() => {
        if(data.chartSelect){
            const selectedIndex = data.chartSelect.findIndex(option => option.label === selector['chart-option']);
            setChartDataIndex(selectedIndex === -1 ? selectedIndex + 1 : selectedIndex);
        }
        else{
            setChartDataIndex(0)
        }
    }, [selector]);
    const config = {
        data: data.chartData[chartDataIndex],
        options: data.chartOptions[chartDataIndex],
    }

    
    const handleChange = async (event) => {
        await handleChangeWrapper(event, selector, setSelector)
        console.log(selector)
    }
    console.log(config);
    console.log(chartDataIndex)
    return(
        <>
            <div className="fourth-card p-4">
                <div className='row d-flex align-items-center justify-content-center position-relative'>
                    <div className='col-9 d-flex align-items-center'>
                        <i className={data.chartIcon}></i>
                        <h6 className='fw-bold fs-5 m-0 mx-2'>{data.chartName} {selector['chart-option']}</h6>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                        { data.chartSelect && <select id="chart-option" name="chart-option" className="form-select" style={{ boxShadow: 'none' }} onChange={handleChange}>
                            {
                                data.chartSelect && data.chartSelect.map((value) => (
                                    <option key={value.id} value={value.label}>{value.label}</option>
                                ))
                            }
                        </select>}
                    </div>
                </div>
                <div className='row d-flex align-items-center justify-content-center position-relative'>
                    {
                        data.chartData !== null ? (
                            <>
                               {(() => {
                                    switch (data.chartType) {
                                        case 'matrix':
                                            return <Matrix data={config.data} options={config.options} />;
                                        case 'bar':
                                            return <Bar data={config.data} options={config.options}/>;
                                        case 'line':
                                            return <Line data={config.data} options={config.options}/>;
                                        case 'pie':
                                            return <Pie data={config.data} options={config.options}/>;
                                        default:
                                            return null;
                                    }
                                })()}
                                
                            </>
                        ) :
                        (
                            'There is no data here'
                        )
                    }
                </div>
            </div>
        </>
    )
}