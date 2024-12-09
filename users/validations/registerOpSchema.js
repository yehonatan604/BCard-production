import Joi from "joi";
import { emailRegex, israeliPhoneRegex, mongoIdRegex } from "../../helpers/regex.js";

export const opSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        })
        .required(),
    phone: Joi.string()
        .ruleset.regex(israeliPhoneRegex)
        .rule({ message: 'op "phone" mast be a valid phone number' })
        .required(),
    email: Joi.string()
        .ruleset.pattern(emailRegex)
        .rule({ message: 'op "mail" mast be a valid mail' })
        .required(),
    group: Joi.string()
        .ruleset.pattern(mongoIdRegex)
        .rule({ message: 'op "group" mast be a valid mongoId' })
        .required(),
});