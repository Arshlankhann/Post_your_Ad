const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    property_type: { type: String, required: true },
    bhk: { type: String, required: true },
    bathrooms: { type: String, required: true },
    furnishing: { type: String, required: true },
    project_status: { type: String, required: true },
    listed_by: { type: String, required: true },
    super_builtup_area: { type: Number, required: true },
    carpet_area: { type: Number, required: true },
    maintenance: { type: Number, required: true },
    total_floors: { type: Number, required: true },
    floor_no: { type: Number, required: true },
    parking: { type: String, required: true },
    facing: { type: String, required: true },
    project_name: { type: String },
    ad_title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    user_name: { type: String, required: true },
}, {
    timestamps: true 
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;