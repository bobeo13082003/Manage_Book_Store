const Book = require("../../models/book");
const Users = require("../../models/user");
const Order = require("../../models/orders");

module.exports.allUserOrder = async (req, res) => {
    try {
        const docs = await Users.find({ role: 0 })
            .select('-password -re_token')
            .sort({ createdAt: -1 })
            .lean();

        const users = docs.map(u => ({
            id: u._id.toString(),
            username: u.username,
            email: u.email,
            phone: u.phone,
            address: u.address,

        }));

        return res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.allBook = async (req, res) => {
    try {
        const books = await Book.find({ deleted: false })
        const formattedBooks = books.map(book => ({
            id: book._id.toString(),
            title: book.title,
            price: book.price
        }));
        res.json(formattedBooks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch books", error: error.message });
    }
}


module.exports.createOrder = async (req, res) => {
    try {
        const formData = req.body;
        const { customerId, userEmail, recipient, phone, address, status, items } = formData;

        if (!customerId || !userEmail || !recipient || !phone || !address) {
            return res.status(400).json({ message: 'Missing required customer information' });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'At least one item is required' });
        }

        const user = await Users.findById(customerId);
        if (!user) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const validStatuses = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {
            if (!item.bookId || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ message: 'Invalid item data' });
            }

            const book = await Book.findById(item.bookId);
            if (!book) {
                return res.status(404).json({ message: `Book with ID ${item.bookId} not found` });
            }

            orderItems.push({
                book: item.bookId,
                qty: parseInt(item.quantity),
                unitPrice: book.price
            });

            totalPrice += book.price * item.quantity;
        }

        const order = new Order({
            user: customerId,
            items: orderItems,
            status: status || 'pending',
            totalPrice,
            shippingInfo: {
                recipient,
                phone,
                address
            }
        });

        const savedOrder = await order.save();

        const populatedOrder = await Order.findById(savedOrder._id)
            .populate('user', 'email name')
            .populate('items.book', 'title price');

        return res.status(201).json({
            message: 'Order created successfully',
            order: populatedOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};