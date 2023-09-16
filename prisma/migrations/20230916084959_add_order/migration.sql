-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('NOT_PAID', 'PAID');

-- AlterTable
ALTER TABLE "room" ADD COLUMN     "discount" DECIMAL;

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "pk_order" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_detail" (
    "id" UUID NOT NULL,
    "price" DECIMAL NOT NULL,
    "disks" JSONB NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'NOT_PAID',

    CONSTRAINT "pk_order_detail" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "fk_order_room" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "fk_order_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "fk_order_order_detail" FOREIGN KEY ("id") REFERENCES "order_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
