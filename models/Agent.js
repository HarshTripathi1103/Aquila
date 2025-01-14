const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    background: {
        type: String,
        required: [true, 'Background is required'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        enum: ['gpt-4o-mini', 'gpt-4', 'gpt-3.5']
    },
    goal: {
        type: String,
        required: [true, 'Goal is required'],
        trim: true
    },
    expected_output: {
        type: String,
        required: [true, 'Expected output is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Agent', agentSchema);