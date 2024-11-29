var express = require('express');
var router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// GET all contacts
router.get('/', (req, res, next) => {
    Contact.find()
        .populate('group')
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: 'An error occurred',
                error: error.message // Improved error logging
            });
        });
});

// GET a specific contact by ID
router.get('/:id', (req, res) => {
    Contact.findOne({ id: req.params.id })
        .populate('group')
        .then(contact => {
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found.',
                    error: { contact: 'Contact not found' }
                });
            }
            res.status(200).json(contact);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error.message // Improved error logging
            });
        });
});

// POST a new contact
router.post('/', (req, res, next) => {
    const contact = new Contact({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group || [] // Default to an empty array if no group is provided
    });

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: 'Contact added successfully',
                contact: createdContact
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error.message // Improved error logging
            });
        });
});

// PUT (update) a contact by ID
router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found.',
                    error: { contact: 'Contact not found' }
                });
            }
            // Update contact properties
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl;
            contact.group = req.body.group || []; // Update group

            // Use updateOne to save changes
            return Contact.updateOne({ id: req.params.id }, contact);
        })
        .then(result => {
            res.status(204).json({
                message: 'Contact updated successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error.message // Improved error logging
            });
        });
});

// DELETE a contact by ID
router.delete('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found.',
                    error: { contact: 'Contact not found' }
                });
            }
            return Contact.deleteOne({ id: req.params.id });
        })
        .then(result => {
            res.status(204).json({
                message: 'Contact deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error.message // Improved error logging
            });
        });
});

module.exports = router; 