import { FieldError } from '../generated/graphql';

//map errors to field
export const errorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });

    return errorMap;
};
