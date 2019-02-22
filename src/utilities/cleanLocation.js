function cleanLocation(thisString) {

    let returnString = thisString.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    returnString = returnString.replace(/\sof\s/gi, ' of ');
    returnString = returnString.replace(/\sthe\s/gi, ' the ');
    returnString = returnString.replace(/\sNE\s/gi, ' NE ');
    returnString = returnString.replace(/^NE\s/gi, 'NE ');
    returnString = returnString.replace(/\sNW\s/gi, ' NW ');
    returnString = returnString.replace(/^NW\s/gi, 'NW ');
    returnString = returnString.replace(/\sSE\s/gi, ' SE ');
    returnString = returnString.replace(/^SE\s/gi, 'SE ');
    returnString = returnString.replace(/\sSW\s/gi, ' SW ');
    returnString = returnString.replace(/^SW\s/gi, 'SW ');

    return returnString;

}

export default cleanLocation;