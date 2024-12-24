import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        // Get the userId from the request body
        const { id: userId } = await readBody(event);

        if (!userId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                message: 'User ID is required',
            });
        }

        // Fetch users from the database, excluding the user with the given userId
        const users = await prisma.user.findMany({
            where: {
            id: {
                not: userId, // Exclude the user with the provided userId
            },
            role: {
                not: 'admin', // Exclude users with the role 'admin'
            },
            },
        });

        // Map users to return only firstName and lastName
        return users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            userId : user.id.toString()
        }));
    } catch (error: unknown) {
        console.error("Error occurred:", error);

        // Type narrowing to ensure error is an instance of Error
        if (error instanceof Error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                message: error.message || 'Unexpected error occurred',
            });
        } else {
            // If error is not an instance of Error, create a generic error
            throw createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                message: 'Unexpected error occurred',
            });
        }
    } finally {
        await prisma.$disconnect();
    }
});
