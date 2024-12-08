import { Schema } from "mongoose";
import { DEFAULT_STRING_VALIDATION } from "../validations/mongoose/String.js";
import { DEFAULT_NUMBER_VALIDATION, DEFAULT_NUMBER_VALIDATION_OPTIONAL } from "../validations/mongoose/Number.js";

const Address = new Schema({
    state: { ...DEFAULT_STRING_VALIDATION, default: "not defined" },
    country: DEFAULT_STRING_VALIDATION,
    city: DEFAULT_STRING_VALIDATION,
    street: DEFAULT_STRING_VALIDATION,
    houseNumber: { ...DEFAULT_NUMBER_VALIDATION, minLength: 1 },
    zip: {
        ...DEFAULT_NUMBER_VALIDATION_OPTIONAL,
        minLength: 4,
        default: 0,
    },
});

export default Address;