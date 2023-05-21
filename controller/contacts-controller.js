const { HttpError, ctrlWrapper } = require('../helpers');
const { Contact } = require('../models/contacts');


const get = async (req, res) => {
    const result = await Contact.find({}, "name phone");
    // console.log(result);
    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById({ _id: id });
    console.log(contact);

    if (!contact) throw HttpError(404, "Not found");
    
    res.json(contact);

    // if (contact) return res.status(201).json(contact);
    // throw HttpError(404, 'not found');
}

const create = async (req, res) => {
    const contact = await Contact.create(req.body)
    res.status(201).json(contact);
}

const update = async (req, res, next) => {
    const { id } = req.params;
    const body = req;
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) throw HttpError(404, 'not found');
    res.status(200).json(contact);
}

const updateStatusContact = async (req, res, next) => {
    const { body } = req;
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) throw HttpError(404, 'not found');
    res.status(200).json(contact);
}

const remove = async (req, res, next) => {
    const { id } = req.params
    const contact = await Contact.findByIdAndDelete(id);
    if (contact === null) throw HttpError(404, 'not found');
    return res.status(200).json({ message: "contact deleted" });
}

module.exports = {
    get: ctrlWrapper(get),
    getById: ctrlWrapper(getById),
    create: ctrlWrapper(create),
    update: ctrlWrapper(update),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    remove: ctrlWrapper(remove),
}
