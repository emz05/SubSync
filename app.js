import express from 'express';

import {PORT} from './config/env.js';

//import routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

//built in middlewares
//handles json data sent in requests (api calls)
app.use(express.json());
//process form data sent by html forms in a simple format
app.use(express.urlencoded({extended: false}));
//reads cookies from incoming requests so app can store user data
app.use(cookieParser());
app.use(arcjetMiddleware);

// put routes to use
// gets to sign up by heading to api/v1/auth/signup (prepends to the path of the routes in each router)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

//create first route
// refer to app instance, call method of http call to be made (post, get, delete)
// (path of where route is reachable: / is homepage, callback function (request, response) to where to put to use {})
app.get('/', (req, res) => {
    res.send('Welcome to the Subcription Tracker API!');
});

// to be able to access first route, server needs to be able to listen for requests
// (specify which port it listens on: port, callback function that executes when running application: hostname)
app.listen(PORT, async() =>{
    // exposes full url to where can access routes
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    // async function
    await connectToDatabase();
});

export default app;