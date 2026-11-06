# Artisan and technician marketplace — SQL queries

## 1. Show related booking, customer, service_listing records (up to 20).

```sql
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
```

| booking_booking_id | booking_scheduled_start | customer_customer_id | customer_display_name | service_listing_listing_id | service_listing_title |
| --- | --- | --- | --- | --- | --- |
| 401 | 2026-11-10T19:00:00+00:00 | 101 | Avery Morgan | 301 | Bicycle Tune-Up |
| 402 | 2026-11-11T15:00:00+00:00 | 102 | Riley Chen | 301 | Bicycle Tune-Up |

## 2. Find booking records where scheduled_start matches "2026-11-10T14:00:00-05:00" (up to 20).

```sql
SELECT * FROM portfolio."booking"
WHERE "scheduled_start" IS NOT DISTINCT FROM '2026-11-10T14:00:00-05:00'
ORDER BY "booking_id"
LIMIT 20;
```

| booking_id | customer_id | listing_id | scheduled_start | status | agreed_price | created_at |
| --- | --- | --- | --- | --- | --- | --- |
| 401 | 101 | 301 | 2026-11-10T19:00:00+00:00 | pending | 67.5 | 2026-10-20T12:00:00+00:00 |

## 3. Count booking records for each customer_id (up to 20 groups).

```sql
SELECT "customer_id", count(*) AS record_count
FROM portfolio."booking"
GROUP BY "customer_id"
ORDER BY record_count DESC, "customer_id" NULLS LAST
LIMIT 20;
```

| customer_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 0.979 | 0.979, 0.97, 0.985 | Sort → Seq Scan | 112 |
| After index | 0.175 | 0.24, 0.175, 0.166 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 0.979 ms to 0.175 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=0.954..0.956 rows=20 loops=1)
  Seq Scan on booking (actual time=0.015..0.92 rows=20 loops=1)
Planning Time: 0.331 ms
Execution Time: 0.979 ms
```

### Before index, run 2

```text
Sort (actual time=0.946..0.948 rows=20 loops=1)
  Seq Scan on booking (actual time=0.015..0.913 rows=20 loops=1)
Planning Time: 0.327 ms
Execution Time: 0.97 ms
```

### Before index, run 3

```text
Sort (actual time=0.962..0.963 rows=20 loops=1)
  Seq Scan on booking (actual time=0.014..0.928 rows=20 loops=1)
Planning Time: 0.305 ms
Execution Time: 0.985 ms
```

### After index, run 1

```text
Sort (actual time=0.165..0.168 rows=20 loops=1)
  Bitmap Heap Scan on booking (actual time=0.039..0.118 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.02..0.021 rows=20 loops=1)
Planning Time: 0.772 ms
Execution Time: 0.24 ms
```

### After index, run 2

```text
Sort (actual time=0.121..0.122 rows=20 loops=1)
  Bitmap Heap Scan on booking (actual time=0.028..0.087 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=20 loops=1)
Planning Time: 0.525 ms
Execution Time: 0.175 ms
```

### After index, run 3

```text
Sort (actual time=0.114..0.116 rows=20 loops=1)
  Bitmap Heap Scan on booking (actual time=0.026..0.08 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.015 rows=20 loops=1)
Planning Time: 0.525 ms
Execution Time: 0.166 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run AJELE_JEREMIAH_301846013_P2_Queries.sql, then AJELE_JEREMIAH_301846013_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/AJELE_JEREMIAH_301846013_P2_QueryResults.png) · [Index comparison](screenshots/AJELE_JEREMIAH_301846013_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

