const cleanTime = (timeStamp) => {
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }
    const thisDate = new Date(timeStamp);

    return thisDate.toLocaleString('en-US', timeOptions)
}

export default cleanTime