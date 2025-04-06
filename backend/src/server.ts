import app from './app';
import { connectDB } from './config/database';
import { config } from './config/env';

const PORT = config.PORT;
const NODE_ENV = config.NODE_ENV;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
