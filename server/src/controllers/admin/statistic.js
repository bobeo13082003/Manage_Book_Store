const Users = require("../../models/user");
const Order = require("../../models/orders");

module.exports.dashBoard = async (req, res) => {
    try {
        const { year } = req.params;
        const selectedYear = year ? parseInt(year) : new Date().getFullYear();

        if (year && (isNaN(selectedYear) || selectedYear < 1900 || selectedYear > 2100)) {
            return res.status(400).json({ message: 'Invalid year format. Use a valid year (e.g., 2025).' });
        }

        const dateFilter = {
            createdAt: {
                $gte: new Date(selectedYear, 0, 1),
                $lte: new Date(selectedYear, 11, 31, 23, 59, 59, 999),
            },
        };

        const totalOrders = await Order.countDocuments(dateFilter);

        const totalCustomers = await Users.countDocuments({});

        const ordersByMonth = await Order.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id': 1 } },
        ]);

        const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
        const ordersByMonthData = months.map((month) => {
            const found = ordersByMonth.find((item) => item._id === parseInt(month));
            return found ? found.count : 0;
        });

        const response = {
            stats: {
                totalOrders,
                totalCustomers,
            },
            ordersByMonth: {
                labels: months.map((m) => `Tháng ${m}`),
                data: ordersByMonthData,
            },
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Dashboard API error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};