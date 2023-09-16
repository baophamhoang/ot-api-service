-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "fk_order_order_detail";

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "fk_order_order_detail" FOREIGN KEY ("id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
