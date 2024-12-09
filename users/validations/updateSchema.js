import Joi from "joi";
import { israeliPhoneRegex, urlRegex } from "../../helpers/regex.js";

export const updateUserSchema = Joi.object({
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
});