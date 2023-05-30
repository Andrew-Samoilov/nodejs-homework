const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controllers/contacts-controller')
const { validateBody, isValidId } = require("../../middlewares");
const { sсhemas } = require("../../schemas/schemas");

router.get('/', ctrlContact.get)

router.get('/:id',
    isValidId,
    ctrlContact.getById)

router.post('/',
    validateBody(sсhemas.addSchema),
    ctrlContact.create)

router.put('/:id',
    isValidId,
    validateBody(sсhemas.addSchema),
    ctrlContact.update)

router.patch('/:id/favorite',
    isValidId,
    validateBody(sсhemas.updateFavoriteSchema),
    ctrlContact.updateStatusContact)

router.delete('/:id',
    isValidId,
    ctrlContact.remove)

module.exports = router
