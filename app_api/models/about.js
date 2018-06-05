var mongoose = require('mongoose');

var bannerSchema = new mongoose.Schema({
   src: String,
   alr: String
});

var imgSchema = new mongoose.Schema({
   src: String,
   alt: String
});

var itemSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    date: Date,
    banner: bannerSchema,
    img: imgSchema
});

var aboutSchema = new mongoose.Schema({
    title: String,
    items: [itemSchema]
});

mongoose.model('About', aboutSchema);