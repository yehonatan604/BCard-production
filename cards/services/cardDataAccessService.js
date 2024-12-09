import { statusCodes } from "../../helpers/statusCodes.js";
import { handleError } from "../../helpers/handleError.js";
import Op from "../../users/models/Op.js";
import Card from "../models/Card.js";

const { BAD_REQUEST, NOT_FOUND } = statusCodes;

const create = async (data, opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const card = new Card(data);
        await card.save();

        return Promise.resolve(card);
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};


const getAll = async (opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const cards = await Card.find({ op });
        if (!cards || cards.length === 0) throw new Error("No cards found in the database");

        return Promise.resolve(cards);
    } catch (error) {
        return handleError(res, NOT_FOUND, error.message);
    }
};

const getOne = async (cardId, opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const card = await Card.findOne({ _id: cardId, op });
        if (!card) throw new Error("Could not find this card in the database");

        return Promise.resolve(card);
    } catch (error) {
        return handleError(res, NOT_FOUND, error.message);
    }
};

const updateOne = async (cardId, data, opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const card = await Card.findAndUpdate({ _id: cardId, op }, data, { new: true });
        if (!card) throw new Error("Could not find this card in the database");

        return Promise.resolve(card);
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

const deleteOne = async (cardId, opId) => {
    try {
        const op = await Op.findById(opId)._id;
        if (!op) throw new Error("Could not find this op in the database");

        const card = await Card.findOneAndDelete({ _id: cardId, op });

        if (!card)
            throw new Error(
                "Could not delete card because a card with this ID cannot be found in the database"
            );
        return Promise.resolve(card);
    } catch (error) {
        return handleError(res, BAD_REQUEST, error.message);
    }
};

export {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
};
