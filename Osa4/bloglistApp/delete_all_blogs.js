const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const logger = require("./utils/logger");

const deleteAllBlogs = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB");

    await Blog.deleteMany({});
    logger.info("All blogs deleted");

    mongoose.connection.close();
  } catch (error) {
    logger.error("Error deleting blogs:", error.message);
    mongoose.connection.close();
  }
};

deleteAllBlogs();
