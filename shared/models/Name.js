import { Schema } from "mongoose";
import { DEFAULT_STRING_VALIDATION, DEFAULT_STRING_VALIDATION_OPTIONAL } from "../validations/mongoose/String.js";

const Name = new Schema({
    first: DEFAULT_STRING_VALIDATION,
    middle: DEFAULT_STRING_VALIDATION_OPTIONAL,
    last: DEFAULT_STRING_VALIDATION,
});

export default Name;
