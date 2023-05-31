const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controllers/contacts-controller')
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { sсhemas } = require("../../schemas/schemas");

router.get('/', authenticate, ctrlContact.get);

router.get('/:id',
    authenticate,
    isValidId,
    ctrlContact.getById)

router.post('/',
    authenticate,
    validateBody(sсhemas.addSchema),
    ctrlContact.create)

router.put('/:id',
    authenticate,
    isValidId,
    validateBody(sсhemas.addSchema),
    ctrlContact.update)

router.patch('/:id/favorite',
    authenticate,
    isValidId,
    validateBody(sсhemas.updateFavoriteSchema),
    ctrlContact.updateStatusContact)

router.delete('/:id',
    authenticate,
    isValidId,
    ctrlContact.remove)

module.exports = router
