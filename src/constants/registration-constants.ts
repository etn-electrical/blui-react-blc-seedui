export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};

export const defaultPasswordRequirements = (): PasswordRequirement[] => [
    {
        regex: /^.{8,16}$/,
        description: 'At least 8 characters in length',
    },
    {
        regex: /[0-9]+/,
        description: 'At least 1 digit',
    },
    {
        regex: /[A-Z]+/,
        description: 'At least 1 uppercase letter',
    },
    {
        regex: /[a-z]+/,
        description: 'At least 1 lowercase letter',
    },
    {
        regex: /[!@#$^&]+/,
        description: 'At least 1 special character (Valid: !@#$^&)',
    },
];

export const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const ADMIN_CONSTANTS = ['admin', 'organization'];

export const ERROR_MSG = 'Something went wrong.'


