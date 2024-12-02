import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event); // POST request body
    const { id } = body;

    try {
        const cards = await prisma.card.findMany({
            where: {
                userId: id,
            },
        });

        // Return card elements as individual objects
        return cards.map(card => ({
            type: card.type,
            cardNumber: card.cardNumber.toString(),
            cardName: card.cardName,
            validDate: card.validDate,
            secNumber: card.secNumber,
            cardAmount: card.cardAmount.toString(),
            cardDebt: card.cardDebt.toString(),
            userId: card.userId.toString(),
        }));
    } catch (error) {
        console.error("Error while fetching user:", error);
        return { error: "An error occurred while fetching cards" };
    }
});
