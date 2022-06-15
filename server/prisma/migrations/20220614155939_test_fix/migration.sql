-- DropForeignKey
ALTER TABLE `UserProject` DROP FOREIGN KEY `UserProject_projectId_fkey`;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
