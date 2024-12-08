import { Schema, model } from "mongoose";
import { DEFAULT_STRING_VALIDATION } from "../../shared/validations/mongoose/String.js";

const schema = new Schema({
    code: DEFAULT_STRING_VALIDATION,
    lecturers: [DEFAULT_STRING_VALIDATION],
    startDate: DEFAULT_STRING_VALIDATION,
    endDate: DEFAULT_STRING_VALIDATION,
});

const ClassCode = model("classCode", schema);
export default ClassCode;
