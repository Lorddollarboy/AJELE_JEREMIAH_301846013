-- Show related booking, customer, service_listing records (up to 20).
SELECT t0."booking_id" AS "booking_booking_id",
       t0."scheduled_start" AS "booking_scheduled_start",
       t1."customer_id" AS "customer_customer_id",
       t1."display_name" AS "customer_display_name",
       t2."listing_id" AS "service_listing_listing_id",
       t2."title" AS "service_listing_title"
FROM portfolio."booking" t0
JOIN portfolio."customer" t1 ON t0."customer_id" = t1."customer_id"
JOIN portfolio."service_listing" t2 ON t0."listing_id" = t2."listing_id"
ORDER BY t0."booking_id", t1."customer_id", t2."listing_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."booking_id" AS "booking_booking_id",
       t0."scheduled_start" AS "booking_scheduled_start",
       t1."customer_id" AS "customer_customer_id",
       t1."display_name" AS "customer_display_name",
       t2."listing_id" AS "service_listing_listing_id",
       t2."title" AS "service_listing_title"
FROM portfolio."booking" t0
JOIN portfolio."customer" t1 ON t0."customer_id" = t1."customer_id"
JOIN portfolio."service_listing" t2 ON t0."listing_id" = t2."listing_id"
ORDER BY t0."booking_id", t1."customer_id", t2."listing_id"
LIMIT 20;

-- Find booking records where scheduled_start matches "2026-11-10T14:00:00-05:00" (up to 20).
SELECT * FROM portfolio."booking"
WHERE "scheduled_start" IS NOT DISTINCT FROM '2026-11-10T14:00:00-05:00'
ORDER BY "booking_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."booking"
WHERE "scheduled_start" IS NOT DISTINCT FROM '2026-11-10T14:00:00-05:00'
ORDER BY "booking_id"
LIMIT 20;

-- Count booking records for each customer_id (up to 20 groups).
SELECT "customer_id", count(*) AS record_count
FROM portfolio."booking"
GROUP BY "customer_id"
ORDER BY record_count DESC, "customer_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "customer_id", count(*) AS record_count
FROM portfolio."booking"
GROUP BY "customer_id"
ORDER BY record_count DESC, "customer_id" NULLS LAST
LIMIT 20;
