const protect = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {
    getAllArcs,
    getArcById,
    createArc,
    updateArc,
    deleteArc
} = require('../controllers/arcController');

router.route('/').get(getAllArcs).post(protect, createArc);

router.route('/:id')
    .get(getArcById)
    .put(protect, updateArc)
    .delete(protect, deleteArc)

module.exports = router;