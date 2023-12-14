import express from 'express';
import {
  deleteUser,
  findAllUsers,
  findOneUser,
  login,
  register,
  updateUser,
} from './users.controller.js';
import {
  protectRoutesWithToken,
  validateExistUser,
} from './users.middleware.js';

export const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.use(protectRoutesWithToken);

router.get('/', findAllUsers);

router
  .route('/:id')
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, updateUser)
  .delete(validateExistUser, deleteUser);
