import express from 'express';
const router = express.Router();
import Response from '../models/response.js';

// Get all responses
router.get('/api/admin/responses', async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const totalResponses = await Response.countDocuments();
    const averageRating = await Response.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    
    const ageDistribution = await Response.aggregate([
      { 
        $bucket: {
          groupBy: "$age",
          boundaries: [0, 18, 25, 35, 45, 55, 65, 100],
          default: "Other",
          output: {
            count: { $sum: 1 }
          }
        }
      }
    ]);

    res.json({
      totalResponses,
      averageRating: averageRating[0]?.avgRating || 0,
      ageDistribution
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router