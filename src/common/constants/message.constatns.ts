export const generateMessage = (entity: string) => ({
    AlreadyExists: `${entity} already exists!`,
    NotFound: `${entity} not found!`,
    FailedToCreate: `Failed to create ${entity}!`,
    FailedToUpdate: `Failed to update ${entity}!`,
    FailedToDelete: `Failed to delete ${entity}!`,
});

export const message = {
    user: {
        ...generateMessage('User'),
        emailNotVerified: 'Email not verified! Please check your email to verify your account!',
        passwordNotMatch: 'Password does not match!',
        passwordChanged: 'Password changed successfully!',
        passwordEmpty: 'Please Check Your Email To Change Password!',
    },

};
