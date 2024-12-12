-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_cardNumber_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- AlterTable
ALTER TABLE `card` MODIFY `cardAmount` DOUBLE NOT NULL,
    MODIFY `cardDebt` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `cardCardId` BIGINT NULL,
    MODIFY `paymentAmount` DOUBLE NOT NULL,
    MODIFY `userId` BIGINT NULL;

-- AlterTable
ALTER TABLE `transfer` MODIFY `transferAmount` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_cardCardId_fkey` FOREIGN KEY (`cardCardId`) REFERENCES `Card`(`cardId`) ON DELETE SET NULL ON UPDATE CASCADE;
