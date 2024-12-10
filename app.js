import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sessionMiddleware } from './middlewares/session.js';
import router from './routes/router.js';
import {config} from './config.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use('/auth', router);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});
