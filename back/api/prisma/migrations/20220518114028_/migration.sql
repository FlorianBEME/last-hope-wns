/*
  Warnings:

  - You are about to drop the column `project_owner_id` on the `Project` table. All the data in the column will be lost.
  - Added the required column `product_owner_id` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `project_owner_id`,
    ADD COLUMN `product_owner_id` VARCHAR(191) NOT NULL;
