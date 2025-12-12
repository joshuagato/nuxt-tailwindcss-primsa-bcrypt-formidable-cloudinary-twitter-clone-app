import { mediaFileTransformer } from "./mediaFiles";
import { userTransformer } from "./user";
import human from "human-time";

export const tweetTransformer = (tweet) => {
    const { id, text, mediaFiles, author, replies, replyTo, createdAt } = tweet;

    return {
        id,
        text,
        mediaFiles: !!mediaFiles ? mediaFiles.map(mediaFileTransformer) : [],
        author: !!author ? userTransformer(author) : null,
        replies: !!replies ? replies.map(tweetTransformer) : [],
        replyTo: !!replyTo ? tweetTransformer(replyTo) : null,
        repliesCount: !!replies ? replies.length : 0,
        postedAtHuman: human(createdAt),
    };
};
