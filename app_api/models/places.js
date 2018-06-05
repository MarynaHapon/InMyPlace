var mongoose = require('mongoose');

var imgSchema = new mongoose.Schema({
    src: { type: String, required: true },
    alt: { type: String, required: true }
});

var workHoursSchema = new mongoose.Schema({
    days: { type: String, required: true },
    opening: String,
    closing: String,
    closed: { type: Boolean, required: true }
});

var commentSchema = new mongoose.Schema({
    name: String,
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: String,
    date: { type: Date, "default": Date.now }
});

var sidebarInfoSchema = new mongoose.Schema({
   title: String,
   body: [String]
});

var placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    rating: { type: Number, "default": 0, min: 0, max: 5 },
    facilities: [String],
    img: imgSchema,
    coords: { type: [Number], index: '2dsphere'},
    workHours: [workHoursSchema],
    comments: [commentSchema],
    sidebar: sidebarInfoSchema
});

mongoose.model('Place', placeSchema);

