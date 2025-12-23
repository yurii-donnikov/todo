const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  try {
    // 1️⃣ читаем заголовок
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No Authorization header" });
    }

    // 2️⃣ проверяем формат: Bearer TOKEN
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid auth format" });
    }

    // 3️⃣ проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ кладём userId в request
    req.userId = decoded.userId;

    // 5️⃣ пускаем дальше
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
