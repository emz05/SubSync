import {Router} from 'express';
import {getUsers, getUser} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

// GET /users -> get all users => static
// GET /users/:id where id ranges (123, 4123) => dynamic

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user'}));

userRouter.get('/:id', (req, res) => res.send({title: 'DELETE user'}));

export default userRouter;