-- Artisan and technician marketplace: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."customer" (
  "customer_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "email" text NOT NULL,
  "created_at" timestamptz NOT NULL,
  CONSTRAINT "pk_customer" PRIMARY KEY ("customer_id"),
  CONSTRAINT "uq_customer_0" UNIQUE ("email")
);
CREATE TABLE portfolio."artisan" (
  "artisan_id" bigint NOT NULL,
  "display_name" text NOT NULL,
  "service_area" text NOT NULL,
  "verified" boolean NOT NULL,
  "joined_at" timestamptz NOT NULL,
  CONSTRAINT "pk_artisan" PRIMARY KEY ("artisan_id")
);
CREATE TABLE portfolio."service_listing" (
  "listing_id" bigint NOT NULL,
  "artisan_id" bigint NOT NULL,
  "title" text NOT NULL,
  "category" text NOT NULL,
  "hourly_rate" numeric(18,2) NOT NULL,
  "active" boolean NOT NULL,
  CONSTRAINT "pk_service_listing" PRIMARY KEY ("listing_id")
);
CREATE TABLE portfolio."booking" (
  "booking_id" bigint NOT NULL,
  "customer_id" bigint NOT NULL,
  "listing_id" bigint NOT NULL,
  "scheduled_start" timestamptz NOT NULL,
  "status" text NOT NULL,
  "agreed_price" numeric(18,2) NOT NULL,
  "created_at" timestamptz NOT NULL,
  CONSTRAINT "pk_booking" PRIMARY KEY ("booking_id")
);
ALTER TABLE portfolio."service_listing" ADD CONSTRAINT "fk_service_listing_0" FOREIGN KEY ("artisan_id") REFERENCES portfolio."artisan" ("artisan_id");
ALTER TABLE portfolio."booking" ADD CONSTRAINT "fk_booking_0" FOREIGN KEY ("customer_id") REFERENCES portfolio."customer" ("customer_id");
ALTER TABLE portfolio."booking" ADD CONSTRAINT "fk_booking_1" FOREIGN KEY ("listing_id") REFERENCES portfolio."service_listing" ("listing_id");
ALTER TABLE portfolio."service_listing" ADD CONSTRAINT "listing_rate_positive" CHECK ("hourly_rate" > 0);
ALTER TABLE portfolio."booking" ADD CONSTRAINT "booking_price_positive" CHECK ("agreed_price" > 0);
CREATE UNIQUE INDEX "active_booking_slot_unique" ON portfolio."booking" ("listing_id", "scheduled_start") WHERE (("status" = 'pending') OR ("status" = 'confirmed'));
COMMIT;
