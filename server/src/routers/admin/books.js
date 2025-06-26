const { upload } = require('../../middleware/upload.middleware');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);