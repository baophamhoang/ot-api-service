/*
  Warnings:

  - Added the required column `restaurant_id` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "room" ADD COLUMN     "restaurant_id" VARCHAR(255) NOT NULL;
