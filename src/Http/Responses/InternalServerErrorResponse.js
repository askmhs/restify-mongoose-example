export default (res, message) => {
    res.status(500);
    res.json({
        success: false,
        status: 500,
        message: message,
        error_code: 5,
        data: null
    });
}