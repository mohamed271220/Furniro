const User = require("../models/User");

exports.isUser = async (req, res, next) => {
    try {
        //console.log(req.user);
        let user = await User.findOne({ googleId: req.user.id });
        if (!user) {
            user = await User.findById(req.user.id);
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
