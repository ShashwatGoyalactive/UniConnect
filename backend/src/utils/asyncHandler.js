const asyncHandler = (rquestHandler) => {
    return (req, res, next) => {
        Promise.resolve(rquestHandler(req, res, next)).catch((error) =>
            next(error)
        );
    };
};

module.exports = { asyncHandler };
