import {Router} from 'express';
const userRouter = Router();

// GET /users -> get all users => static
// GET /users/:id where id ranges (123, 4123) => dynamic

userRouter.get('/', (req, res) => res.send({title: 'GET all users'}));

userRouter.get('/:id', (req, res) => res.send({title: 'GET user details'}));

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user'}));

userRouter.get('/:id', (req, res) => res.send({title: 'DELETE user'}));

export default userRouter;