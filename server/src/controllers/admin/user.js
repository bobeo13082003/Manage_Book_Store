const Users = require("../../models/user");
const { hashPassword } = require("../../utils/bcryptHelper");

module.exports.getAll = async (req, res) => {
    try {
        const docs = await Users.find({})
            .select('-password -re_token')
            .sort({ createdAt: -1 })
            .lean();

        const users = docs.map(u => ({
            id: u._id.toString(),
            username: u.username,
            email: u.email,
            phone: u.phone,
            address: u.address,
            role: u.role,
            status: u.status,
            avatar: u.avatar || { url: '', public_id: '' },
            createdAt: u.createdAt,
            updatedAt: u.updatedAt
        }));

        return res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.create = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            phone,
            address,
            role = 0,
            status = 'inactive'
        } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: 'username, email, password là bắt buộc' });

        if (await Users.exists({ email }))
            return res.status(409).json({ message: 'Email đã tồn tại' });

        const hash = await hashPassword(password);

        const doc = await Users.create({
            username,
            email,
            password: hash,
            phone,
            address,
            role,
            status
        });

        const { password: _p, re_token, ...user } = doc.toObject();
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const disallowed = ['password', '_id', 'createdAt', 'updatedAt'];
        disallowed.forEach(key => delete req.body[key]);

        const doc = await Users.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        }).select('-password -re_token');

        if (!doc) return res.status(404).json({ message: 'User không tồn tại' });

        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;            // 'active' | 'inactive'

        if (!['active', 'inactive'].includes(status))
            return res.status(400).json({ message: 'status không hợp lệ' });

        const doc = await Users.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).select('-password -re_token');

        if (!doc) return res.status(404).json({ message: 'User không tồn tại' });
        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (![0, 1].includes(Number(role)))
            return res.status(400).json({ message: 'role phải là 0 hoặc 1' });

        const doc = await Users.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select('-password -re_token');

        if (!doc) return res.status(404).json({ message: 'User không tồn tại' });
        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};