export const validateNewEmail = (email: string) => {
    if (!email.includes("@")) {
        //username must be longer than 2 letters/numbers
        return [
            {
                field: "email",
                message: "Invalid e-mail.",
            },
        ];
    }
    return null;
};
