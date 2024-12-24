-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `phone` BIGINT NOT NULL,
    `mail` VARCHAR(100) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `cardId` BIGINT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(10) NOT NULL,
    `cardNumber` BIGINT NOT NULL,
    `cardName` VARCHAR(50) NOT NULL,
    `validDate` DATETIME(3) NOT NULL,
    `secNumber` INTEGER NOT NULL,
    `cardAmount` BIGINT NOT NULL,
    `cardDebt` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,

    UNIQUE INDEX `Card_cardNumber_key`(`cardNumber`),
    PRIMARY KEY (`cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transfer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `incomingAccountId` BIGINT NULL,
    `incomingCardNumber` BIGINT NOT NULL,
    `outcomingAccountId` BIGINT NULL,
    `outcomingCardNumber` BIGINT NOT NULL,
    `transferDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transferAmount` BIGINT NOT NULL,
    `transferDetail` VARCHAR(100) NULL,
    `transferStatus` VARCHAR(20) NOT NULL,
    `userId` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `accountId` BIGINT NOT NULL,
    `cardNumber` BIGINT NOT NULL,
    `receiverNumber` BIGINT NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paymentAmount` BIGINT NOT NULL,
    `paymentDetail` VARCHAR(100) NULL,
    `paymentStatus` VARCHAR(20) NOT NULL,
    `userId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_incomingCardNumber_fkey` FOREIGN KEY (`incomingCardNumber`) REFERENCES `Card`(`cardNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_outcomingCardNumber_fkey` FOREIGN KEY (`outcomingCardNumber`) REFERENCES `Card`(`cardNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_cardNumber_fkey` FOREIGN KEY (`cardNumber`) REFERENCES `Card`(`cardNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
