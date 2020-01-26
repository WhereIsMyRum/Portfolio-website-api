const mongoose = require('mongoose');
const { BlogPostSchema } = require('../models');

mongoose.connect("mongodb://root:example@mongo:27017/page?authSource=admin", {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("Database connected"))
        .catch(error => {console.log("error");console.log(error.stack)});

mongoose.model("BlogPost", BlogPostSchema);

module.exports = mongoose;
