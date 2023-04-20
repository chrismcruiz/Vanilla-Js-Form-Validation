const calculateAge = (dob) => {

    //calculate month difference from current date in time  
    const month_diff = Date.now() - new Date(dob).getTime();

    //convert the calculated difference in date format  
    const age_dt = new Date(month_diff);

    //extract year from date      
    const year = age_dt.getUTCFullYear();

    //now calculate the age of the user  
    const age = Math.abs(year - 1970);

    return age
}

export { calculateAge }