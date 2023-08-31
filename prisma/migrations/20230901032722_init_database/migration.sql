CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR(128) NOT NULL,
    "last_name" VARCHAR(128) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "middle_name" VARCHAR(128),
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "avatar_url" TEXT,
    "sub" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,
    "display_name" VARCHAR(64) NOT NULL,
    "description" VARCHAR(255),
    "can_be_updated" BOOLEAN NOT NULL DEFAULT true,
    "can_be_deleted" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_role" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resource_name" VARCHAR(255) NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "can_create" BOOLEAN NOT NULL,
    "can_read" BOOLEAN NOT NULL,
    "can_update" BOOLEAN NOT NULL,
    "can_delete" BOOLEAN NOT NULL,
    "permission_group_id" UUID NOT NULL,

    CONSTRAINT "pk_permission" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_group" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resource_name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "pk_permission_group" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_role" (
    "user_id" UUID NOT NULL,
    "role_ip" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_user_to_role" PRIMARY KEY ("user_id","role_ip")
);

-- CreateTable
CREATE TABLE "role_to_permission" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_role_to_permission" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scraping_url" VARCHAR(255) NOT NULL,
    "due_time" TIMESTAMPTZ(6),
    "alias" VARCHAR(255),
    "scraping_data" JSONB NOT NULL,
    "host_id" UUID NOT NULL,

    CONSTRAINT "pk_room" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_room" (
    "user_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,

    CONSTRAINT "pk_user_to_room" PRIMARY KEY ("user_id","room_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_sub_key" ON "user"("email", "sub");

-- AddForeignKey
ALTER TABLE "permission" ADD CONSTRAINT "fk_permission_permission_group_id" FOREIGN KEY ("permission_group_id") REFERENCES "permission_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role_role" FOREIGN KEY ("role_ip") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_permission" ADD CONSTRAINT "fk_role_to_permission_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_permission" ADD CONSTRAINT "fk_role_to_permission_permission" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "fk_room_host" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_room" ADD CONSTRAINT "fk_user_to_room_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_room" ADD CONSTRAINT "fk_user_to_room_room" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
