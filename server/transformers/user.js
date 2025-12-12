export const userTransformer = (user) => {
    const { id, name, email, username, profileImage } = user;

    return {
        id,
        name,
        email,
        username,
        profileImage,
        handle: "@" + user.username,
    };
};
