import app from './app';
import { connectDB } from './db';

const port = process.env.PORT;

connectDB();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
