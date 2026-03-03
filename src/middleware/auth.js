const protect = (req, res, next) => {
    apiKey = req.headers('api-key')
    if ((!apiKey) || apiKey !== process.env.API_KEY) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }
    next();
};

module.exports = protect;