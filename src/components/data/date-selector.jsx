import React, { useState, useEffect } from "react";
import { CURRENTMONTH, CURRENTYEAR, MONTHS, YEARS } from "../../constants";


export default function DateSelector(props) {
    const { selectedDate, setSelectedDate, handleChange, ctx, dateDoesntHaveMonth, dateDoesntHaveYear } = props;
    const [months, setMonths] = useState([...MONTHS.slice(0, CURRENTMONTH + 1).reverse()]);

    const allMonths = MONTHS.slice().reverse();
    useEffect(() => {
      if (parseInt(selectedDate[`${ctx}-selected-year`]) === CURRENTYEAR) {
          const currentYearMonths = [...MONTHS.slice(0, CURRENTMONTH + 1).reverse()];
          setSelectedDate(prev => ({
            ...prev,
            [`${ctx}-selected-month`]: MONTHS[CURRENTMONTH]
        }))
          setMonths(currentYearMonths);
      } else {
          setMonths(allMonths);
      }
  }, [selectedDate[`${ctx}-selected-year`], CURRENTYEAR, CURRENTMONTH]);

    return(
        <>
        {
            !dateDoesntHaveMonth &&
            !selectedDate[`${ctx}-all-time-enabled`] && (
            <select className="form-select mx-2" name={`${ctx}-selected-month`} disabled={selectedDate[`${ctx}-all-time-enabled`]} value={selectedDate[`${ctx}-selected-month`]} 
            onChange={handleChange}>
                {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                ))}
            </select>
            )
        }
        {   !dateDoesntHaveYear &&
            <select className="form-select mx-2" name={`${ctx}-selected-year`} value={selectedDate[`${ctx}-selected-year`]} 
            onChange={handleChange}>
                {YEARS.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                ))}
            </select>}
        </>
    )
}
