-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'PETUGAS') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RFIDCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `status` ENUM('AKTIF', 'NONAKTIF') NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `RFIDCard_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GateLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('MASUK', 'KELUAR', 'DITOLAK') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rfidId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RFIDCard` ADD CONSTRAINT `RFIDCard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GateLog` ADD CONSTRAINT `GateLog_rfidId_fkey` FOREIGN KEY (`rfidId`) REFERENCES `RFIDCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
