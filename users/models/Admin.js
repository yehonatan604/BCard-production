import { Schema, model } from "mongoose";
import Name from "../../shared/models/Name.js"
import { DEFAULT_STRING_VALIDATION } from "../../shared/validations/mongoose/String.js";
import { emailRegex, israeliPhoneRegex, passwordRegex } from "../../helpers/regex.js";
import { DEFAULT_BOOLEAN_VALIDATION_OPTIONAL } from "../../shared/validations/mongoose/Boolean.js";
import { DEFAULT_ID_VALIDATION } from "../../shared/validations/mongoose/Id.js";

const schema = new Schema({
    name: Name,
    phone: {
        ...DEFAULT_STRING_VALIDATION,
        match: RegExp(israeliPhoneRegex),
    },
    email: {
        ...DEFAULT_STRING_VALIDATION,
        match: RegExp(emailRegex),
        unique: true,
    },
    password: {
        ...DEFAULT_STRING_VALIDATION,
        match: RegExp(passwordRegex),
    },
    classCode: DEFAULT_ID_VALIDATION("classCode"),
    isVerified: DEFAULT_BOOLEAN_VALIDATION_OPTIONAL,
});

const Admin = model("admin", schema);
export default Admin;
