const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

//Get contacts
router.get('/', auth, async (req, res) => {
  try {
    const contact = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contact);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

//Create contacts
router.post(
  '/',
  [
    body('name', 'name is required').not().isEmpty(),
    body('email', 'please enter a valid email').isEmail(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      let contact = await Contact.findOne({ email });

      contact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type,
      });
      await contact.save();
      res.send(contact);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
);

//Update contacts
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    await contact.save();
    res.json(contact);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

//Delete contacts
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });

    await Contact.findByIdAndRemove(req.params.id);

    res.send('Deleted sucessfully');
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});
module.exports = router;
