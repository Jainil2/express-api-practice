import express from 'express';
const router = express.Router({ mergeParams: true });

import { createUser, createTable, getUsers, getUser, updateUser, deleteUser, deleteAll, deleteTable } from '../controllers/userController.js';

router.get('/create-table', createTable);

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:id', getUser);

router.get('/name/:name', getUser);

router.get('/email/:email', getUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.delete('/', deleteAll);

router.delete('/delete-table', deleteTable);

export default router;