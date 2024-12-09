import Joi from 'joi';
import { emailRegex, israeliPhoneRegex, mongoIdRegex, urlRegex } from '../../helpers/regex.js';

export const createCardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
        .ruleset.regex(israeliPhoneRegex)
        .rule({ message: 'card "phone" mast be a valid phone number' })
        .required(),
    email: Joi.string()
        .ruleset.pattern(emailRegex)
        .rule({ message: 'card "mail" mast be a valid mail' })
        .required(),

    web: Joi.string()
        .ruleset.regex(urlRegex)
        .rule({ message: 'card "web" mast be a valid url' })
        .allow(""),

    image: Joi.object()
        .keys({
            url: Joi.string()
                .ruleset.regex(urlRegex)
                .rule({ message: 'card.image "url" mast be a valid url' })
                .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
        })
        .required(),
    address: Joi.object()
        .keys({
            state: Joi.string().allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number(),
        })
        .required(),
    bizNumber: Joi.number().allow(""),
    user_id: Joi.string().required(),
    op: Joi.string()
        .pattern(mongoIdRegex)
        .rule({ message: 'card "op" mast be a valid mongoId' })
        .required(),
});

