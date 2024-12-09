import Joi from 'joi';
import { emailRegex, passwordRegex } from '../../helpers/regex.js';

export const loginUserSchema = Joi.object({
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
});