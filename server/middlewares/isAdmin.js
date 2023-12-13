const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
    const user = await User.findOne({ googleId: req.user.id });
    if (user.role !== "admin" && user.role !== "coolerAdmin") {
        const error = new Error("You are not authorized");
        error.statusCode = 403;
        return next(error);
    }
    next();
};
