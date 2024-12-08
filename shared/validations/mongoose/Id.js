import { Schema } from 'mongoose';

const DEFAULT_ID_VALIDATION = (ref) => {
    return {
        type: Schema.Types.ObjectId,
        required: true,
        ref
    }
};


export { DEFAULT_ID_VALIDATION };