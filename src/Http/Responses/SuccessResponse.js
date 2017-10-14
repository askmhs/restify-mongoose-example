/**
 * Success Response
 * @param res
 * @param message
 * @param data
 */
export default (res, message, data) => {
    res.status(200);
    res.json({
        success: true,
        status: 200,
        message: message,
        error_code: null,
        data: data
    });
}