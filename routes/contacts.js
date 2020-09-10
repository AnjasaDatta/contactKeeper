const express = require('express');
const router = express.Router();

//Get contacts
router.get('/', (req, res) => {
  res.send('Get contacts');
});

//Create contacts
router.post('/', (req, res) => {
  res.send('Create contacts');
});

//Update contacts
router.put('/:id', (req, res) => {
  res.send('Update contacts');
});

//Delete contacts
router.delete('/:id', (req, res) => {
  res.send('Delete contacts');
});
module.exports = router;
