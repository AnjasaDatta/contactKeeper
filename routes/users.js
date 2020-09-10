const express = require('express');
const router = express.Router();

//Create or Register a user , public
router.post('/', (req, res) => {
  res.send('Register a User');
});
module.exports = router;
