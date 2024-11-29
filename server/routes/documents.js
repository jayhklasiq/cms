var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

// GET all documents
router.get('/', (req, res, next) => {
    Document.find()
        .then(documents => {
            res.status(200).json(documents);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// GET a specific document by custom ID
router.get('/:id', (req, res) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            if (!document) {
                return res.status(404).json({
                    message: 'Document not found.',
                    error: 'Document not found'
                });
            }
            res.status(200).json(document);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error.message
            });
        });
});

// POST a new document
router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    document.save()
        .then(createdDocument => {
            res.status(201).json({
                message: 'Document added successfully',
                document: createdDocument
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// PUT (update) a document by ID
router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            if (!document) {
                return res.status(404).json({
                    message: 'Document not found.',
                    error: { document: 'Document not found' }
                });
            }
            // Update document properties
            document.name = req.body.name;
            document.description = req.body.description;
            document.url = req.body.url;

            Document.updateOne({ id: req.params.id }, document)
                .then(result => {
                    res.status(204).json({
                        message: 'Document updated successfully'
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

// DELETE a document by ID
router.delete('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            if (!document) {
                return res.status(404).json({
                    message: 'Document not found.',
                    error: { document: 'Document not found' }
                });
            }
            Document.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'Document deleted successfully'
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
