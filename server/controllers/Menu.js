const MenuSection = require('../models/MenuSection');

const getMenu = async (req, res) => {
    try {
        const menu = await MenuSection.find();
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Chyba při načítání menu z databáze." });
    }
};

module.exports = {
    getMenu
};