const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/database1')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define schemas
const logEntrySchema = new mongoose.Schema({
  content: { type: String, required: true },
}, { timestamps: true });

const imageColorSchema = new mongoose.Schema({
  imageName: { type: String, required: true },
  colorCodes: [{ type: String, required: true }],
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Define models with specific collection names
const LogEntry = mongoose.model('LogEntry', logEntrySchema, 'myapp_LogEntry');
const Image = mongoose.model('ImageColor', imageColorSchema, 'myapp_ImageColor');
const User = mongoose.model('User', userSchema, 'myapp_Users');

// Define discriminators for different log entry types
const AppError = LogEntry.discriminator('AppError', new mongoose.Schema({}), 'myapp_AppErrors');
const AppSuccessfulSession = LogEntry.discriminator('AppSuccessfulSession', new mongoose.Schema({}), 'myapp_AppSuccessfulSessions');
const ServerConnection = LogEntry.discriminator('ServerConnection', new mongoose.Schema({}), 'myapp_ServerConnections');
const ServerError = LogEntry.discriminator('ServerError', new mongoose.Schema({}), 'myapp_ServerErrors');
const ServerRequest = LogEntry.discriminator('ServerRequest', new mongoose.Schema({}), 'myapp_ServerRequests');

// Logging function updated for specific collection names
async function logEvent(category, content) {
  // Mapping category to model
  const categoryToModel = {
    AppErrors: AppError,
    AppSuccessfulSessions: AppSuccessfulSession,
    ServerConnections: ServerConnection,
    ServerErrors: ServerError,
    ServerRequests: ServerRequest,
  };

  const Model = categoryToModel[category];
  if (!Model) {
    console.error(`Invalid log category: ${category}`);
    return;
  }

  try {
    const logEntry = new Model({ content });
    await logEntry.save();
    console.log(`Logged event to ${category}: ${content}`);
  } catch (error) {
    console.error(`Error logging event in category ${category}: ${error}`);
  }
}


// Image operations
async function checkImageData(imageName) {
  try {
    const image = await Image.findOne({ imageName });
    return image ? { exists: true, data: image } : { exists: false };
  } catch (error) {
    console.error(`Error checking image data: ${error}`);
    return { exists: false };
  }
}

async function saveImageData(imageName, colorCodes, logger) {
  try {
    const image = new Image({ imageName, colorCodes });
    await image.save();
    logger({ category: "ServerRequests", content: `Image saved: ${imageName}` });
  } catch (error) {
    logger({ category: "ServerErrors", content: `Error saving image: ${error.message}` });
  }
}

async function fetchAllImages(logger) {
  try {
    const images = await Image.find({});
    logger({ category: "ServerRequests", content: "Fetched all images" });
    return images;
  } catch (error) {
    logger({ category: "ServerErrors", content: `Error fetching images: ${error.message}` });
    return [];
  }
}

// User operations
async function createUser(email, password, logger) {
  try {
    const user = new User({ email, password });
    await user.save();
    logger({ category: "AppSuccessfulSessions", content: `User created: ${email}` });
    return { success: true };
  } catch (error) {
    logger({ category: "AppErrors", content: `Error creating user: ${error.message}` });
    return { success: false, error: error.message };
  }
}

async function authenticateUser(email, password, logger) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger({ category: "AppErrors", content: `User not found: ${email}` });
      return { success: false, error: 'User not found' };
    }
    // Simplified check, hashing library for later
    if (user.password !== password) {
      logger({ category: "AppErrors", content: `Invalid password for: ${email}` });
      return { success: false, error: 'Invalid password' };
    }
    logger({ category: "AppSuccessfulSessions", content: `User authenticated: ${email}` });
    return { success: true, user };
  } catch (error) {
    logger({ category: "AppErrors", content: `Error authenticating user: ${error.message}` });
    return { success: false, error: error.message };
  }
}

module.exports = {
  saveImageData,
  fetchAllImages,
  createUser,
  authenticateUser,
  logEvent,
  // Export any other functions you need
};