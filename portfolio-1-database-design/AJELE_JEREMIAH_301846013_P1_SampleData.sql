-- Fictional sample records for Artisan and technician marketplace.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."customer" ("customer_id", "display_name", "email", "created_at") VALUES (101, 'Avery Morgan', 'avery.morgan@example.test', '2026-10-12T09:00:00Z');
INSERT INTO portfolio."customer" ("customer_id", "display_name", "email", "created_at") VALUES (102, 'Riley Chen', 'riley.chen@example.test', '2026-10-13T10:30:00+00:00');
INSERT INTO portfolio."artisan" ("artisan_id", "display_name", "service_area", "verified", "joined_at") VALUES (201, 'Jordan Lee', 'North District', TRUE, '2026-09-01T08:15:00Z');
INSERT INTO portfolio."service_listing" ("listing_id", "artisan_id", "title", "category", "hourly_rate", "active") VALUES (301, 201, 'Bicycle Tune-Up', 'Repair', 45, TRUE);
INSERT INTO portfolio."booking" ("booking_id", "customer_id", "listing_id", "scheduled_start", "status", "agreed_price", "created_at") VALUES (401, 101, 301, '2026-11-10T14:00:00-05:00', 'pending', 67.5, '2026-10-20T12:00:00Z');
INSERT INTO portfolio."booking" ("booking_id", "customer_id", "listing_id", "scheduled_start", "status", "agreed_price", "created_at") VALUES (402, 102, 301, '2026-11-11T15:00:00Z', 'confirmed', 90, '2026-10-21T13:00:00+00:00');
COMMIT;
