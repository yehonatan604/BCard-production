import { urlRegex } from "../../../helpers/regex.js";

const URL = {
    type: String,
    match: RegExp(urlRegex),
    trim: true,
    lowercase: true,
};

export { URL };
