const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    weight: String,
    allergens: String,
    price: { type: String, required: true }
});

const MenuSectionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: String,
    icon: { type: String, required: true },
    type: { type: String, enum: ['food', 'drink'], required: true },
    items: [MenuItemSchema]
});

module.exports = mongoose.model('MenuSection', MenuSectionSchema);