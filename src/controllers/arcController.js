const Arc = require('../models/arc');

// GET /api/arcs
const getAllArcs = async (req, res, next) => {
    try {
        const arcs = await Arc.find().sort({order: 1});
        res.status(200).json({
            success: true,
            count: arcs.length,
            data: arcs,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/arcs/:id
const getArcById = async (req, res, next) => {
    
    try {
        const arc = await Arc.findById(req.params.id);
        if (!arc) {
            return res.status(404).json({
                success: false,
                message: 'Arc not found'
            });
        }
        res.status(200).json({
            success: false,
            data: arc,
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/arcs
const createArc = async (req, res, next) => {
    try {
        const arc = await Arc.create(req.body);
        res.status(201).json({
            success: true,
            data: arc
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/arcs/:id
const updateArc = async (req, res, next) => {
    try {
        const arc = await Arc.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!arc) {
            return res.status(404).json({
                success: false,
                message: 'Arc not found',
            });
        }
        res.status(200).json({
            success: true,
            data: arc,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/arcs/:id
const deleteArc = async (req, res, next) => {
    try {
        const arc = await Arc.findByIdAndDelete(req.params.id);
        if (!arc) {
            return res.status(404).json({
                success: false,
                message: 'Arc not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Arc deleted',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllArcs,
    getArcById,
    createArc,
    updateArc,
    deleteArc
};