const User = require("../models/User");

exports.isCoolerAdmin = async (req, res, next) => {
    const user = await User.findOne({ googleId: req.user.id });
    if (user.role !== "coolerAdmin") {
        const error = new Error("You are not authorized");
        error.statusCode = 403;
        return next(error);
    }
    next();
};