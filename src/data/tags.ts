import { prisma } from "../libs/db";

const getTagsByUserId = async (userId: string) => {
    try {
        const tags = await prisma.tag.findMany({
            where: {
                userId: userId,
            },
        });

        return tags;
    } catch (error) {
        throw new Error("There was an error loading the tags.");
    }
};

const getTagsByQuestionId = async (questionId: string) => {
    try {
        const questionWithTags = await prisma.interviewQuestion.findUnique({
            where: {
                id: questionId,
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!questionWithTags) {
            throw new Error("Question not found");
        }

        const tags = questionWithTags.tags.map(
            (questionTag) => questionTag.tag,
        );

        return tags;
    } catch (error) {
        throw new Error("There was an error loading the tags.");
    }
};

export { getTagsByUserId, getTagsByQuestionId };
