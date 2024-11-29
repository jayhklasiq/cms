var express = require('express');
var router = express.Router();
const Message = require('../models/message'); // Import the Message model

// GET all messages
router.get('/', (req, res, next) => {
    Message.find()
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// GET a specific message by ID
router.get('/:id', (req, res) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            if (!message) {
                return res.status(404).json({
                    message: 'Message not found.',
                    error: { message: 'Message not found' }
                });
            }
            res.status(200).json(message);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// POST a new message
router.post('/', (req, res, next) => {
    const message = new Message({
        id: req.body.id,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                message: createdMessage
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// PUT (update) a message by ID
router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            if (!message) {
                return res.status(404).json({
                    message: 'Message not found.',
                    error: { message: 'Message not found' }
                });
            }
            // Update message properties
            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = req.body.sender;

            Message.updateOne({ id: req.params.id }, message)
                .then(result => {
                    res.status(204).json({
                        message: 'Message updated successfully'
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// DELETE a message by ID
router.delete('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            if (!message) {
                return res.status(404).json({
                    message: 'Message not found.',
                    error: { message: 'Message not found' }
                });
            }
            Message.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'Message deleted successfully'
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

module.exports = router; 