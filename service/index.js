const Contact = require('./shemas/contact')

const getAllcontacts = async () => {
    return Contact.find()
}

const getContactById = (id) => {
    return Contact.findOne({ _id: id })
}

const createContact = ({ title, text }) => {
    return Contact.create({ title, text })
}

const updateContact = (id, fields) => {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContact = (id) => {
    return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
    getAllcontacts,
    getContactById,
    createContact,
    updateContact,
    removeContact,
}
