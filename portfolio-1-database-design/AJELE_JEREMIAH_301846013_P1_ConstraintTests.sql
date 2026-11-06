-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. duplicate customer pk. Expected: pk_customer, SQLSTATE 23505.
INSERT INTO portfolio."customer" ("customer_id", "display_name", "email", "created_at")
VALUES (101, 'Case Customer', 'case.customer@example.test', '2026-11-01T09:00:00Z');

-- 2. duplicate customer email. Expected: uq_customer_0, SQLSTATE 23505.
INSERT INTO portfolio."customer" ("customer_id", "display_name", "email", "created_at")
VALUES (901, 'Email Duplicate', 'avery.morgan@example.test', '2026-11-01T09:00:00Z');

-- 3. null customer name. Expected: display_name, SQLSTATE 23502.
INSERT INTO portfolio."customer" ("customer_id", "display_name", "email", "created_at")
VALUES (902, NULL, 'null.name@example.test', '2026-11-01T09:00:00Z');

-- 4. duplicate artisan pk. Expected: pk_artisan, SQLSTATE 23505.
INSERT INTO portfolio."artisan" ("artisan_id", "display_name", "service_area", "verified", "joined_at")
VALUES (201, 'Case Artisan', 'West District', FALSE, '2026-11-01T09:00:00Z');

-- 5. duplicate listing pk. Expected: pk_service_listing, SQLSTATE 23505.
INSERT INTO portfolio."service_listing" ("listing_id", "artisan_id", "title", "category", "hourly_rate", "active")
VALUES (301, 201, 'Case Listing', 'Craft', 30, TRUE);

-- 6. missing listing artisan. Expected: fk_service_listing_0, SQLSTATE 23503.
INSERT INTO portfolio."service_listing" ("listing_id", "artisan_id", "title", "category", "hourly_rate", "active")
VALUES (903, 99901, 'Unlinked Listing', 'Repair', 35, TRUE);

-- 7. nonpositive listing rate. Expected: listing_rate_positive, SQLSTATE 23514.
INSERT INTO portfolio."service_listing" ("listing_id", "artisan_id", "title", "category", "hourly_rate", "active")
VALUES (904, 201, 'Zero Rate Listing', 'Repair', 0, TRUE);

-- 8. duplicate booking pk. Expected: pk_booking, SQLSTATE 23505.
INSERT INTO portfolio."booking" ("booking_id", "customer_id", "listing_id", "scheduled_start", "status", "agreed_price", "created_at")
VALUES (401, 101, 301, '2026-11-12T10:00:00Z', 'cancelled', 50, '2026-11-01T09:00:00Z');

-- 9. missing booking customer. Expected: fk_booking_0, SQLSTATE 23503.
INSERT INTO portfolio."booking" ("booking_id", "customer_id", "listing_id", "scheduled_start", "status", "agreed_price", "created_at")
VALUES (905, 99902, 301, '2026-11-12T10:00:00Z', 'cancelled', 50, '2026-11-01T09:00:00Z');

-- 10. missing booking listing. Expected: fk_booking_1, SQLSTATE 23503.
INSERT INTO portfolio."booking" ("booking_id", "customer_id", "listing_id", "scheduled_start", "status", "agreed_price", "created_at")
VALUES (906, 101, 99903, '2026-11-12T10:00:00Z', 'cancelled', 50, '2026-11-01T09:00:00Z');

-- 11. nonpositive booking price. Expected: booking_price_positive, SQLSTATE 23514.
INSERT INTO portfolio."booking" ("booking_id", "customer_id", "listing_id", "scheduled_start", "status", "agreed_price", "created_at")
VALUES (907, 101, 301, '2026-11-12T10:00:00Z', 'cancelled', 0, '2026-11-01T09:00:00Z');

-- 12. duplicate active booking slot. Expected: active_booking_slot_unique, SQLSTATE 23505.
INSERT INTO portfolio."booking" ("booking_id", "customer_id", "listing_id", "scheduled_start", "status", "agreed_price", "created_at")
VALUES (908, 102, 301, '2026-11-10T14:00:00-05:00', 'confirmed', 75, '2026-11-01T09:00:00Z');
