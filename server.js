import express from 'express';
import router from './router/router.js';
import chalk from 'chalk';
import { logger } from './middleware/logger.js';
import connectToDb from './services/DB/dbService.js';
import { ErrorMiddleware } from './middleware/error.js';

const app = express();
const PORT = 8080;

// Add middleware to parse JSON, Maximum request body size is 5MB
app.use(express.json({ limit: '2mb' }));

// add a custom morgan logger middleware
app.use(logger);

// Add the router to the app
app.use(router);

// Error handling middleware
app.use(ErrorMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(chalk.blue(`Server is running on port ${PORT}`));
    connectToDb();
});

