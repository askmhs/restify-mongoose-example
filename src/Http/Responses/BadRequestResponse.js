export default (res, message) => {
    res.status(400);
    res.json({
        success: false,
        status: 400,
        message: message,
        error_code: 3,
        data: null
    });
}