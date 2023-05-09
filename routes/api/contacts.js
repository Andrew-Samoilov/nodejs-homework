const express = require('express');

const contacts = require("../../models/contacts");

const router = express.Router()

router.get("/", async (_, res) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status = "success";
    res.code = 200;
    res.json(allContacts);
  }
  catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'contactId template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
