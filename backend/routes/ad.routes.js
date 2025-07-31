const router = require('express').Router();
const Ad = require('../models/ad.model');

router.post('/', async (req, res) => {
    try {
        const requiredFields = [
            'property_type', 'bhk', 'bathrooms', 'furnishing', 'project_status',
            'listed_by', 'super_builtup_area', 'carpet_area', 'maintenance',
            'total_floors', 'floor_no', 'parking', 'facing', 'ad_title',
            'description', 'price', 'state', 'city', 'user_name'
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ msg: `Please enter the ${field.replace('_', ' ')}` });
            }
        }

        const newAd = new Ad(req.body);
        const savedAd = await newAd.save();
        res.status(201).json({ msg: 'Ad posted successfully!', ad: savedAd });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;