const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Přístup odmítnut. Chybí bezpečnostní token." });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).json({ message: "Neplatný nebo vypršený token. Přihlaste se znovu." });
    }
};

module.exports = verifyToken;