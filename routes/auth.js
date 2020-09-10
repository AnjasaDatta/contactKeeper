const express = require('express');
const router = express.Router();

//Get logged in user,private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

//auth logged in user,public
router.post('/', (req, res) => {
  res.send('auth logged in user');
});
module.exports = router;
