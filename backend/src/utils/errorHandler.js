
export function errorHandler(res, error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}