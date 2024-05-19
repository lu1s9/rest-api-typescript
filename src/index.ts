import app from './app';
import { connectDB } from './db';
import logger from './libs/logger';

const port = process.env.PORT;

connectDB();
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
