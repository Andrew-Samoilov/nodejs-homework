const HttpError = (status, messasge) => {
    const error = new Error(messasge);
    error.status = status;
    return error;
}

module.exports = HttpError;