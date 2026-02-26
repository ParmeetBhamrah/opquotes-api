const express = require('express');
const router = express.Router();
const {
    getAllQuotes,
    getQuoteById,
    createQuote,
    updateQuote,
    deleteQuote,
} = require('../controllers/quoteController');

router.route('/').get(getAllQuotes).post(createQuote);

router.route('/:id')
    .get(getQuoteById)
    .put(updateQuote)
    .delete(deleteQuote);

module.exports = router;