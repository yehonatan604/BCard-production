import { Schema } from "mongoose";
import { URL } from "../validations/mongoose/URL.js";
import { DEFAULT_STRING_VALIDATION } from "../validations/mongoose/String.js";

const Image = new Schema({
    url: URL,
    alt: DEFAULT_STRING_VALIDATION,
});

export default Image;