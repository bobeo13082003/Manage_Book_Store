const Book = require("../../models/book");
const slugify = require('slugify');
const { Category } = require("../../models/categories");

module.exports.createBook = async (req, res) => {
    try {
        const { title, description, price, stock, authors, category, tags, status } = req.body;

        if (!title || !price) {
            return res.status(400).json({ message: "Title and price are required" });
        }

        let images = [];
        if (req.files && req.files.coverUrl) {
            const uploadedFiles = Array.isArray(req.files.coverUrl)
                ? req.files.coverUrl
                : [req.files.coverUrl];

            if (uploadedFiles.length > 3) {
                return res.status(400).json({ message: "Maximum 3 images allowed" });
            }

            images = uploadedFiles.map(f => ({ url: f.path, public_id: f.filename }));
        }

        const newBook = new Book({
            title,
            slug: slugify(title, { lower: true, strict: true }),
            description,
            price,
            stock,
            coverUrl: images,
            authors,
            category,
            tags,
            status
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.error('Lỗi khi tạo sách:', error);
        res.status(500).json({ message: "Failed to create book", error: error.message });
    }
};

module.exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({ deleted: false })
            .populate('authors')
            .populate('category');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch books", error: error.message });
    }
};

// exports.getAllBooks = async (req, res) => {
//   try {
//     // ----- Lấy query & set mặc định -----
//     const page   = Math.max(parseInt(req.query.page)  || 1, 1);
//     const limit  = Math.max(parseInt(req.query.limit) || 20, 1);
//     const skip   = (page - 1) * limit;

//     // ----- Xây filter động -----
//     const filter = {};
//     if (req.query.status)   filter.status   = req.query.status;
//     if (req.query.category) filter.category = req.query.category;

//     // ----- Truy vấn DB -----
//     const [books, total] = await Promise.all([
//       Book.find(filter)
//           .skip(skip)
//           .limit(limit)
//           .populate('category', 'name')  // chỉ lấy trường name
//           .lean(),                       // bỏ meta Mongoose, trả object thường
//       Book.countDocuments(filter)
//     ]);

//     // ----- Trả về -----
//     return res.status(200).json({
//       total,
//       page,
//       limit,
//       data: books
//     });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: 'Lấy danh sách sách thất bại', error: err.message });
//   }
// };


module.exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('authors')
            .populate('category');
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch book", error: error.message });
    }
};

module.exports.updateBook = async (req, res) => {
    try {
        const { title, ...updates } = req.body;

        if (title) {
            updates.title = title;
            updates.slug = slugify(title, { lower: true, strict: true });
        }

        if (req.files && req.files.coverUrl) {
            const uploadedFiles = Array.isArray(req.files.coverUrl)
                ? req.files.coverUrl
                : [req.files.coverUrl];

            if (uploadedFiles.length > 3) {
                return res.status(400).json({ message: "Maximum 3 images allowed" });
            }

            const images = uploadedFiles.map(f => ({
                url: f.path,
                public_id: f.filename
            }));

            updates.coverUrl = images;

        }

        const updated = await Book.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ message: 'Book not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update book', error: err.message });
    }
};

module.exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndUpdate(req.params.id, { deleted: true });
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete book", error: error.message });
    }
};

module.exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'name is required' });
        }
        const category = new Category({
            name,
            slug: slugify(name, { lower: true, strict: true })
        });


        const saved = await category.save();
        res.status(201).json(saved);
    } catch (err) {
        const code = err.code === 11000 ? 409 : 500;
        res.status(code).json({ message: 'Failed to create category', error: err.message });
    }
};


module.exports.getAllCategories = async (_req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
    }
};


module.exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch category', error: err.message });
    }
};

module.exports.updateCategory = async (req, res) => {
    try {
        const { name, ...others } = req.body;
        const updates = { ...others };

        if (name) {
            updates.name = name;
            updates.slug = slugify(title, { lower: true, strict: true });
        }

        const updated = await Category.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        if (!updated) return res.status(404).json({ message: 'Category not found' });
        res.json(updated);
    } catch (err) {
        const code = err.code === 11000 ? 409 : 500;
        res.status(code).json({ message: 'Failed to update category', error: err.message });
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Category not found' });

        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete category', error: err.message });
    }
};