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
    "middle_name" VARCHAR(128) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "avatar_url" TEXT,

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
    "name" VARCHAR(255) NOT NULL,
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
CREATE TABLE "PermissionGroup" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
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

-- AddForeignKey
ALTER TABLE "permission" ADD CONSTRAINT "fk_permission_permission_group_id" FOREIGN KEY ("permission_group_id") REFERENCES "PermissionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_role" ADD CONSTRAINT "fk_user_to_role_role" FOREIGN KEY ("role_ip") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_permission" ADD CONSTRAINT "fk_role_to_permission_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_permission" ADD CONSTRAINT "fk_role_to_permission_permission" FOREIGN KEY ("role_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
