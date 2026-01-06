const express = require('express');
const { check } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
} = require('../controllers/enquiryController');

const router = express.Router();

// Validation Rules
const enquiryValidation = [
  check('clientName', 'Client name is required').not().isEmpty(),
  check('projectName', 'Project name is required').not().isEmpty(),
  check('phone', 'Phone number must be valid (10 digits)').isLength({ min: 10, max: 15 }).isNumeric(),
  check('description', 'Description is required').not().isEmpty(),
  check('budget', 'Budget must be a number').isNumeric(),
  check('links', 'Must be valid URLs if provided').optional().isArray(),
];

// Routes
router.post('/', enquiryValidation, createEnquiry); // Public: Anyone can submit
router.get('/', protect, getEnquiries);             // Protected: Only admin can view
router.get('/:id', protect, getEnquiryById);        // Protected
router.put('/:id', protect, updateEnquiry);         // Protected
router.delete('/:id', protect, deleteEnquiry);      // Protected

module.exports = router;
