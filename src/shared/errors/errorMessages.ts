interface IUnavailableProductDetails {
    quantity: number;
    id: string;
}

export const ERROR_MESSAGES = {
    CUSTOMER: {
        EMAIL_ALREADY_IN_USE: 'There is already one customer with this email.',
        NOT_FOUND: 'Customer not found.',
    },
    ORDERS: {
        ORDER_NOT_FOUND: 'Order not found.',
        CUSTOMER_NOT_FOUND: 'Could not find any customer with the given id.',
        PRODUCT_NOT_FOUND: 'Could not find any product with the given id.',
        INEXISTENT_PRODUCT: (id: string): string =>
            `Could not find product ${id}.`,
        UNAVAILABLE_QUANTITY_PRODUCT: ({
            quantity,
            id,
        }: IUnavailableProductDetails): string => `The quantity ${quantity}
        is not available for ${id}.`,
    },
    PRODUCTS: {
        NAME_ALREADY_IN_USE: 'There is already one product with this name.',
        NOT_FOUND: 'Product not found.',
    },
    USERS: {
        INCORRECT_CREDENTIALS: 'Incorrect email/password combination.',
        EMAIL_ALREADY_IN_USE: 'Email address already used.',
        USER_NOT_FOUND: 'User not found.',
        TOKEN_NOT_FOUND: 'User token does not exists.',
        TOKEN_EXPIRED: 'Token expired.',
        OLD_PASS_REQUIRED: 'Old password is required.',
        OLD_PASS_NOT_MATCH: 'Old password does not match.',
    },
    MIDDLEWARES: {
        JWT_MISSING: 'JWT Token is missing.',
        JWT_INVALID: 'Invalid JWT Token.',
        TOO_MANY_REQUESTS: 'Too many requests.',
    },
};
