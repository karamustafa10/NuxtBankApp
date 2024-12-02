/*
  Warnings:

  - You are about to drop the column `cardCardId` on the `payment` table. All the data in the column will be lost.
  - Made the column `userId` on table `payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_cardCardId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropIndex
DROP INDEX `Payment_cardNumber_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `card` MODIFY `cardAmount` BIGINT NOT NULL,
    MODIFY `cardDebt` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `cardCardId`,
    MODIFY `paymentAmount` BIGINT NOT NULL,
    MODIFY `userId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `transfer` MODIFY `transferAmount` BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_cardNumber_fkey` FOREIGN KEY (`cardNumber`) REFERENCES `Card`(`cardNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
