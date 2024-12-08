const DEFAULT_STRING_VALIDATION_OPTIONAL = {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
};

const DEFAULT_STRING_VALIDATION = {
    ...DEFAULT_STRING_VALIDATION_OPTIONAL,
    required: true,
};

export { DEFAULT_STRING_VALIDATION, DEFAULT_STRING_VALIDATION_OPTIONAL };