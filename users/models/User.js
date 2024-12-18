import { Schema, model } from "mongoose";
import Address from "../../shared/models/Address.js"
import Image from "../../shared/models/Image.js"
import Name from "../../shared/models/Name.js"
import { DEFAULT_STRING_VALIDATION } from "../../shared/validations/mongoose/String.js";
import { emailRegex, israeliPhoneRegex, passwordRegex } from "../../helpers/regex.js";
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
    image: Image,
    address: Address,
    op: DEFAULT_ID_VALIDATION("Op"),
});

const User = model("user", schema);
export default User;
