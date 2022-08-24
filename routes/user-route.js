const express = require('express');
const router = express.Router();
const userController = require ('../controllers/user');


  router.get('/users', userController.listUsers);

  router.get('/users/:id', userController.getUser);

  router.get('/admin', userController.getRole);

  router.post('/users', userController.createUser);

  router.put('/users/:id', userController.updateUser);

  router.put('/password/:id', userController.updatepassword);

  router.delete('/users/:id', userController.deleteUser);

  router.post('/login', userController.login);

  router.post('/password/:id', userController.comparepassword);

  
  router.get('/health', (req, res) => {
    res.send('OK');
  });
  module.exports = router;

