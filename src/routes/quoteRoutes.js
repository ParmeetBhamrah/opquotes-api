const express = require('express');
const router = express.Router();
const {
    getAllQuotes,
    getQuoteById,
    createQuote,
    updateQuote,
    deleteQuote,
    getRandomQuote,
    getQuoteOfTheDay,
    upvoteQuote,
    downvoteQuote
} = require('../controllers/quoteController');

router.route('/').get(getAllQuotes).post(createQuote);
router.get('/today', getQuoteOfTheDay);
router.get('/random', getRandomQuote);
router.route('/:id')
    .get(getQuoteById)
    .put(updateQuote)
    .delete(deleteQuote);
router.post('/:id/upvote', upvoteQuote);
router.post('/:id/downvote', downvoteQuote);

module.exports = router;