import { Schema, model } from "mongoose";
import { DEFAULT_ID_VALIDATION } from "../../shared/validations/mongoose/Id.js";
import { DEFAULT_NUMBER_VALIDATION } from "../../shared/validations/mongoose/Number.js";

const schema = new Schema({
    user: DEFAULT_ID_VALIDATION("user"),
    role: {
        ...DEFAULT_NUMBER_VALIDATION,
        min: 100,
        max: 900,
    }
});

const UserRole = model("user_role", schema);
export default UserRole;
