
function isValidParam( paramName, paramValue ) {
    if( paramValue == null ) {
        throw `Parametro ${paramName} no establecido`;
    }

    return true
}

module.exports = { 
    isValidParam
}