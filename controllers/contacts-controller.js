const { ctrlWrapper, HttpError } = require("../helpers");
const { Contact } = require('../models/contacts');

const get = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email");

    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
        throw HttpError(404, `Not found id: ${id}`);
    }
    res.json(result);
}

const create = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
}

const update = async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
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
