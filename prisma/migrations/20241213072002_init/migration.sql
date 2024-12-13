-- DropIndex
DROP INDEX `Payment_cardNumber_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(10) NOT NULL DEFAULT 'user';
