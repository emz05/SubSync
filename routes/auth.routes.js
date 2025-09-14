import {Router} from 'express';
const authRouter = Router();

// res.send to get a return from api
authRouter.post('/sign-up', (req, res) => res.send({title: 'Sign up'}));
authRouter.post('/sign-in', (req, res) => res.send({title: 'Sign in'}));
authRouter.post('/sign-out', (req, res) => res.send({title: 'Sign out'}));

export default authRouter;