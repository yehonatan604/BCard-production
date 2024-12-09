import { Schema, model } from "mongoose";
import Address from "../../shared/models/Address.js"
import Image from "../../shared/models/Image.js"
import { DEFAULT_STRING_VALIDATION } from "../../shared/validations/mongoose/String.js";
import { emailRegex, israeliPhoneRegex, urlRegex } from "../../helpers/regex.js";
import { DEFAULT_ID_VALIDATION } from "../../shared/validations/mongoose/Id.js";
import { DEFAULT_NUMBER_VALIDATION_OPTIONAL } from "../../shared/validations/mongoose/Number.js";

const schema = new Schema({
    title: DEFAULT_STRING_VALIDATION,
    subtitle: DEFAULT_STRING_VALIDATION,
    description: DEFAULT_STRING_VALIDATION,
    phone: {
        ...DEFAULT_STRING_VALIDATION,
        match: RegExp(israeliPhoneRegex),
    },
    email: {
        ...DEFAULT_STRING_VALIDATION,
        match: RegExp(emailRegex),
    },
    address: Address,
    web: {
        ...DEFAULT_STRING_VALIDATION,
        match: RegExp(urlRegex),
    },
    image: Image,
    bizNumber: DEFAULT_NUMBER_VALIDATION_OPTIONAL,
    likes: [DEFAULT_ID_VALIDATION("User")],
    userId: DEFAULT_ID_VALIDATION("User"),
    op: DEFAULT_ID_VALIDATION("Op"),
});

const Card = model("card", schema);
export default Card;
