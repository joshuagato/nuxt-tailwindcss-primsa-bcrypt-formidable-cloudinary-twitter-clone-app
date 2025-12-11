import { sendError, createError, readBody } from "h3";
import {
    createUser,
    getUserByEmail,
    getUserByUsername,
} from "../../db/users.js";
import { userTransformer } from "~~/server/transformers/user.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { username, email, password, repeatPassword, name } = body;

    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: "Invalid params" })
        );
    }

    if (password !== repeatPassword) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Passwords do not match",
            })
        );
    }

    let existingUser;

    existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw createError({
            statusCode: 401,
            statusMessage: "User with provided email already exists",
        });
    }

    existingUser = await getUserByUsername(username);
    if (existingUser) {
        throw createError({
            statusCode: 401,
            statusMessage: "User with provided username already exists",
        });
    }

    const userData = {
        username,
        email,
        password,
        name,
        profileImage: "https://picsum.photos/200/200",
    };

    const user = await createUser(userData);

    return {
        body: userTransformer(user),
    };
});
