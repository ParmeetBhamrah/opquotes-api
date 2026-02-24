const express = require('express');
const router = express.Router();
const {
    getAllArcs,
    getArcById,
    createArc,
    updateArc,
    deleteArc
} = require('../controllers/arcController');

router.route('/').get(getAllArcs).post(createArc);

router.route('/:id')
    .get(getArcById)
    .put(updateArc)
    .delete(deleteArc)

module.exports = router;