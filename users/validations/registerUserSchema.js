import Joi from "joi";
import { emailRegex, israeliPhoneRegex, mongoIdRegex, passwordRegex, urlRegex } from "../../helpers/regex.js";

export const registerUserSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        })
        .required(),
    phone: Joi.string()
        .ruleset.regex(israeliPhoneRegex)
        .rule({ message: 'user "phone" mast be a valid phone number' })
        .required(),
    email: Joi.string()
        .ruleset.pattern(emailRegex)
        .rule({ message: 'user "mail" mast be a valid mail' })
        .required(),
    password: Joi.string()
        .ruleset.regex(passwordRegex)
        .rule({
            message:
                'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
        })
        .required(),
    image: Joi.object()
        .keys({
            url: Joi.string()
                .ruleset.regex(urlRegex)
                .rule({ message: "user image mast be a valid url" })
                .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
        })
        .required(),
    address: Joi.object()
        .keys({
            state: Joi.string().allow(""),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number(),
        })
        .required(),
    op: Joi.string()
        .ruleset.pattern(mongoIdRegex)
        .rule({ message: 'user "op" mast be a valid mongoId' })
        .required(),
});