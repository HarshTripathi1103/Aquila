
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Agent = require('../models/Agent');


const validateAgent = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('background').trim().notEmpty().withMessage('Background is required'),
    body('model').isIn(['gpt-4o-mini', 'gpt-4', 'gpt-3.5']).withMessage('Invalid model selected'),
    body('goal').trim().notEmpty().withMessage('Goal is required'),
    body('expected_output').trim().notEmpty().withMessage('Expected output is required'),
];


router.post('/agent', validateAgent, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errors: errors.array() 
            });
        }

        const { name, background, model, goal, expected_output } = req.body;

        const agent = new Agent({
            name,
            background,
            model,
            goal,
            expected_output
        });

        await agent.save();

        res.status(200).json({
            success: true,
            message: 'Agent created successfully',
            data: agent
        });

    } catch (error) {
        console.error('Error creating agent:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating agent',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

router.get('/agents', async (req, res) => {
    try {
        const agents = await Agent.find(); 
        res.json(agents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch agents' });
    }
});

module.exports = router;