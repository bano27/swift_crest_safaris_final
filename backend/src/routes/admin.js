const express = require('express');
const router  = express.Router();

// Mock stats — connect to Prisma/MySQL in production
router.get('/stats', (req, res) => {
  res.json({
    totalBookings: 127,
    totalRevenueKES: 8400000,
    activeGuests: 43,
    destinations: 6,
    bookingsByMonth: [
      { month: 'Jan', count: 8 }, { month: 'Feb', count: 10 }, { month: 'Mar', count: 9 },
      { month: 'Apr', count: 6 }, { month: 'May', count: 7 }, { month: 'Jun', count: 11 },
      { month: 'Jul', count: 18 }, { month: 'Aug', count: 20 }, { month: 'Sep', count: 15 },
      { month: 'Oct', count: 12 }, { month: 'Nov', count: 8 }, { month: 'Dec', count: 3 },
    ],
    seasonBreakdown: { peak: 62, shoulder: 25, low: 13 },
  });
});

router.get('/customers', (req, res) => {
  res.json({ customers: [], total: 0 });
});

module.exports = router;
