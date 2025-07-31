const router = require('express').Router();
const Ad = require('../models/ad.model');

router.post('/', async (req, res) => {
    try {
        const newAd = new Ad(req.body);
        
        const savedAd = await newAd.save(); 
        
        res.status(201).json({ msg: 'Ad posted successfully!', ad: savedAd });

    } catch (err) {
        console.error('Error creating ad:', err); 

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            
            return res.status(400).json({
                msg: 'Validation Error. Please check your input data.',
                errors: messages
            });
        }

        res.status(500).json({ msg: 'A server error occurred. Please try again later.' });
    }
});

module.exports = router;