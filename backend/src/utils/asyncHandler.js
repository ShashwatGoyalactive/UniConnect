const asyncHandler = (rquestHandler) => {
    return (req, res, next) => {
        Promise.resolve(rquestHandler(req, res, next)).catch((error) =>
            next(error)
        );
    };
};

export default asyncHandler;
