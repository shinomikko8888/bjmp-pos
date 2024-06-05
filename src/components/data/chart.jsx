import React, { useEffect, useRef, useState } from "react";
import { Matrix } from '../../utils/data-management/chart-data/matrix'
import { Bar, Line, Pie } from "react-chartjs-2";
import { fetchDataWrapper, handleChangeWrapper } from "../../utils";
import { BRANCHES, CURRENTMONTH, CURRENTYEAR, MONTHS, YEARS } from "../../constants";
import DateSelector from "./date-selector";
import { lineChartData, lineChartOptions, matrixDateMonth, matrixDateMonthOption, matrixDateYear, matrixDateYearOption, pieChartData, pieChartOptions } from "../../utils/data-management/chart-data";

export default function ChartTemplate(props){
    const {data} = props
    const [selectedDate, setSelectedDate] = useState({
        [`${data.chartCtx}-branch-enabled`]: false,
        [`${data.chartCtx}-selected-branch`]: localStorage.getItem('bjmp-branch') !== 'BJMPRO-III Main Office' ? localStorage.getItem('bjmp-branch') : '',
        [`${data.chartCtx}-selected-month`]: MONTHS[CURRENTMONTH],
        [`${data.chartCtx}-selected-year`]: CURRENTYEAR,
        [`${data.chartCtx}-all-time-enabled`]: false,
    });
    const [chartData, setChartData] = useState({})
    useEffect(() => {

        fetchData();
        
    }, [selectedDate]);
    const fetchData = async () => {
        try {
            let params = [
                ['ctx', data.chartCtx],
                ['ty', data.chartType],
                ['dt', JSON.stringify(selectedDate)],
        ]
            const bjmpBranch = localStorage.getItem('bjmp-branch');
            if (bjmpBranch !== 'BJMPRO-III Main Office') {
                params.push(['br', bjmpBranch]);
            }
            const rawData = await fetchDataWrapper('get-charts', params);
            setChartData(rawData);

        } catch (error) {
            console.error('Error: ', error)
        }
    }
    

    

    const handleChange = async (event) => {
        await handleChangeWrapper(event, selectedDate, setSelectedDate)
    }
    return(
        <>
            <div className="fourth-card p-4">
                <div className='row d-flex align-items-center justify-content-center position-relative'>
                    <div className={`col-${data.chartSelector ? '6' : '12'} d-flex align-items-center`}>
                        <i className={data.chartIcon}></i>
                        <h6 className='fw-bold fs-5 m-0 mx-2'>{data.chartName}</h6>
                    </div>
                    {data.chartSelector && data.chartSelector.map((selector, index) => {
                        const { isDate = false, hasBranch = false, dateDoesntHaveMonth = false, dateDoesntHaveYear = false } = selector;
                        return (
                            isDate && (
                                <>
                                    <div className={`col-${hasBranch && !dateDoesntHaveMonth ? '4' : '5'} d-flex align-items-center`}>
                                        {
                                            selectedDate[`${data.chartCtx}-branch-enabled`] ? (
                                                <select
                                                    name={`${data.chartCtx}-selected-branch`}
                                                    className="form-select"
                                                    value={selectedDate[`${data.chartCtx}-selected-branch`] || ''}
                                                    style={{ width: '100%', boxShadow: 'none' }}
                                                    onChange={handleChange}
                                                >
                                                    <option value="" disabled hidden>--Select Branch--</option>
                                                    {BRANCHES.map(branch => (
                                                        <optgroup key={branch.label} label={branch.label}>
                                                            {branch.facilities.map((facility, subIndex) => (
                                                                <option key={subIndex} value={facility}>{facility}</option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                            ) : (
                                            <DateSelector
                                                selectedDate={selectedDate}
                                                setSelectedDate={setSelectedDate}
                                                handleChange={handleChange}
                                                ctx={data.chartCtx}
                                                dateDoesntHaveMonth={dateDoesntHaveMonth}
                                                dateDoesntHaveYear={dateDoesntHaveYear}
                                            />
                                            )
                                        }
                                        
                                    </div>
                                    <div className={`col-${hasBranch && !dateDoesntHaveMonth ? '2' : '1'} d-flex align-items-end justify-content-around`}>
                                        {!dateDoesntHaveMonth && <button
                                            type="button"
                                            className={`toggle-form-button${selectedDate[`${data.chartCtx}-all-time-enabled`] ? '-active' : ''} ${hasBranch ? 'me-1 my-0' : 'm-0'}`}
                                            onClick={() => setSelectedDate(prevObj => ({
                                                ...prevObj,
                                                [`${data.chartCtx}-all-time-enabled`]: !prevObj[`${data.chartCtx}-all-time-enabled`]
                                            }))}
                                            disabled={selectedDate[`${data.chartCtx}-branch-enabled`]}
                                        >
                                            <i className="fa-solid fa-calendar-days icon-hover"></i>
                                            <span className="icon-tooltip">View Whole Year</span>
                                        </button>}
                                        { hasBranch && 
                                            <button
                                                    type="button"
                                                    className={`toggle-form-button${selectedDate[`${data.chartCtx}-branch-enabled`] ? '-active' : ''} my-0`}
                                                    onClick={() => setSelectedDate(prevObj => ({
                                                        ...prevObj,
                                                        [`${data.chartCtx}-branch-enabled`]: !prevObj[`${data.chartCtx}-branch-enabled`]
                                                    }))}
                                                    disabled={selectedDate[`${data.chartCtx}-all-time-enabled`]}
                                                >
                                                    <i className="fa-solid fa-building-shield icon-hover"></i>
                                                    <span className="icon-tooltip" >Change <br></br>Branch</span>
                                                </button>
                                                }

                                    </div>
                                </>
                                   
                            )
                        );
                    })}
                </div>
                <div className='row d-flex align-items-center justify-content-center position-relative py-5'>
                    {
                        data.chartData !== null ? (
                            <> 
                               {(() => {
                                    switch (data.chartType) {
                                        case 'matrix':
                                            return chartData[0] && <Matrix 
                                            data={ selectedDate[`${data.chartCtx}-all-time-enabled`] ? 
                                                matrixDateYear(chartData[0], data.chartColor, selectedDate[`${data.chartCtx}-selected-year`]) :
                                                matrixDateMonth(chartData[0], data.chartColor)
                                            }
                                            options={ selectedDate[`${data.chartCtx}-all-time-enabled`] ? 
                                                matrixDateYearOption(selectedDate, data.chartCtx) :
                                                matrixDateMonthOption(selectedDate, data.chartCtx)} 
                                                />;
                                        case 'bar':
                                            return 'Bar'//<Bar data={config.data} options={config.options}/>;
                                        case 'line':
                                            return chartData[0] && <Line
                                             data={lineChartData(chartData[0])} options={lineChartOptions()}/>;
                                        case 'pie':
                                            return chartData && 
                                            <Pie data={pieChartData(chartData)} 
                                            options={pieChartOptions()}/>;
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