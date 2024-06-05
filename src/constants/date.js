const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const CURRENTYEAR = new Date().getFullYear();
  const CURRENTMONTH = new Date().getMonth();

  const YEARS = [];
  for (let i = CURRENTYEAR; i >= 1970; i--) {
    YEARS.push(i);
  }

  export {
    MONTHS,
    YEARS,
    CURRENTYEAR,
    CURRENTMONTH,
  }