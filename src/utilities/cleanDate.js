const cleanDate = (timeStamp) => {
    const dateOptions = {
        timeZone: 'America/New_York',
        hour12: true,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const thisDate = new Date(timeStamp);
    
    return thisDate.toLocaleString('en-US', dateOptions);
}

export default cleanDate