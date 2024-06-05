const scaleMonth = (date, ctx) => {
  const currentDate = new Date(`${date[`${ctx}-selected-year`]}-${date[`${ctx}-selected-month`]}-01`); 
  return {
      y: {
          type: 'time',
          left: 'left',
          offset: true,
          time: {
              unit: 'week',
              round: 'week',
              isoWeekday: 1,
              displayFormats: {
                  week: 'I'
              }
          },
          ticks: {
              maxRotation: 0,
              autoSkip: true,
              padding: 1
          },
          grid: {
              display: false,
              drawBorder: false,
              tickLength: 0,
          },
          title: {
              display: true,
              font: { size: 15, weight: 'bold' },
              text: ({ chart }) => chart.scales.x._adapter.format(currentDate, 'MMM, yyyy'),
              padding: 0
          }
      },
      x: {
          type: 'time',
          position: 'top',
          offset: true,
          time: {
              unit: 'day',
              parser: 'i',
              isoWeekday: 1,
              displayFormats: {
                  day: 'iiiiii'
              }
          },
          reverse: false,
          ticks: {
              source: 'data',
              padding: 0,
              maxRotation: 0,
          },
          grid: {
              display: false,
              drawBorder: false,
          }
      }
  };
};

const scaleYear = (date, ctx) =>  {
  const currentDate = new Date(`${date[`${ctx}-selected-year`]}-${date[`${ctx}-selected-month`]}-01`); 
  return {
    y: {
      type: 'time',
      offset: true,
      time: {
        unit: 'day',
        round: 'day',
        isoWeekday: 1,
        parser: 'i',
        displayFormats: {
          day: 'iiiiii'
        }
      },
      reverse: true,
      position: 'right',
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 1,
        font: {
          size: 9
        }
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0
      }
    },
    x: {
      type: 'time',
      position: 'bottom',
      offset: true,
      time: {
        unit: 'week',
        round: 'week',
        isoWeekday: 1,
        displayFormats: {
          week: 'MMM dd'
        }
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        font: {
          size: 9
        }
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      }
    }}
  }

  export {
    scaleMonth,
    scaleYear
  }