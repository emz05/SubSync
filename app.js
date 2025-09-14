import express from 'express';

import {PORT} from './config/env.js';

//import routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';

const app = express();
// put routes to use
// gets to sign up by heading to api/v1/auth/signup (prepends to the path of the routes in each router)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

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