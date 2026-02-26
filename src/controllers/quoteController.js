const { ModifiedPathsSnapshot } = require('mongoose');
const Quote = require('../models/quote');

// GET /api/quotes
const getAllQuotes = async (req, res, next) => {
    try {
        // filtering
        const filter = {};
        if (req.query.character) filter.character = req.query.character;
        if (req.query.arc) filter.arc = req.query.arc;
        if (req.query.themes) filter.theme = {$in: [req.query.themes]};
        if (req.query.search) filter.text = {$regex: req.query.search, $options: 'i'} // $options: 'i' -> to do case-insensitive search
        
        // pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // sorting
        const sortFIeld = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'desc'? -1: 1;
        const sort = {[sortFIeld]: sortOrder}; // [property]: value -> computed (variable) property name

        const [quotes, total] = await Promise.all([
            Quote.find(filter)
                .populate('character', 'name crew')
                .populate('arc', 'name saga')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Quote.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            total,
            page,
            pages: Math.ceil(total/limit),
            count: quotes.length,
            data: quotes,
        });
    } catch {
        next(error);
    }
};

// GET /api/quotes/:id
const getQuoteById = async (req, res, next) => {
    try {
        const quote = await Quote.findById(req.params.id)
            .populate('character', 'name crew')
            .populate('arc', 'name saga');
        if (!quotes) {
            res.status(404).json({
                success: false,
                message: 'Quote not found',
            });
        }
        res.status(200).json({
            success: true,
            data: quote
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/quotes
const createQuote = async (req, req, next) => {
    try {
        const quote = await Quote.create(req.body);
        res.status(200).json({
            success: true,
            data: quote,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/quotes/:id
const updateQuote = async (req, res, next) => {
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            .populate('character', 'name crew')
            .populate('arc', 'name saga');
        if (!quote) {
            res.status(404).json({
                success: false,
                message: 'Quote not found',
            });
        }
        res.status(200).json({
            success: true,
            data: quote,
        });
        } catch (error) {
        next(error);
    }
};

// DELETE /api/quotes/:id
const deleteQuote = async (req, res, next) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id);
        if (!quote) {
            res.status(404).json({
                success: false,
                message: 'Quote not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Quote deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllQuotes,
    getQuoteById,
    createQuote,
    updateQuote,
    deleteQuote,
};