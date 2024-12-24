import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event); // POST request body
    const { id } = body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        // Return user data if found
        return {
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone.toString(),
            mail: user?.mail,
            id: user?.id.toString(),
        };
    } catch (error) {
        console.error("Error while fetching user:", error);
    }
});
