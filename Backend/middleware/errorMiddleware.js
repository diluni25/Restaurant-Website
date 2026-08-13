// middleware/errorMiddleware.js

// This middleware catches any errors passed using next(err) in our routes
const errorHandler = (err, req, res, next) => {
    // Log the error to the console for debugging
    console.error(`[Error]: ${err.message}`);

    // Send a 500 (Internal Server Error) status and the error message to the client
    res.status(500).send({ 
        success: false,
        message: err.message || 'Server Error Occurred'
    });
};

module.exports = errorHandler;