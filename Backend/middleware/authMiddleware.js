const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Get token from request header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Token Missing",
      });
    }

    // Remove "Bearer "
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user details in request
    req.user = decoded;

    // Go to next middleware/controller
    next();
  } catch (error) {
  console.log(error);

  return res.status(401).json({
    success: false,
    message: error.message,
  });
}
};

module.exports = verifyToken;