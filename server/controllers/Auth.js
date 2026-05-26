const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {

        const token = jwt.sign(
            { role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ token });
    } else {
        res.status(401).json({ message: "Špatné jméno nebo heslo!" });
    }
};

module.exports = { login };