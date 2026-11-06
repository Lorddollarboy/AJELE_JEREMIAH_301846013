# Artisan and technician marketplace — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| customer_id | booking records (list) |
| --- | --- |
| 101 | [401] |
| 102 | [402] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| booking.booking_id | booking.customer_id | booking.listing_id | booking.status | customer.customer_id | customer.display_name | service_listing.listing_id | service_listing.artisan_id |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 401 | 101 | 301 | pending | 101 | Avery Morgan | 301 | 201 |
| 402 | 102 | 301 | confirmed | 102 | Riley Chen | 301 | 201 |

Key: booking_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## booking_example

| booking.booking_id | booking.customer_id | booking.listing_id | booking.status | customer.customer_id | customer.display_name | service_listing.listing_id | service_listing.artisan_id |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 401 | 101 | 301 | pending | 101 | Avery Morgan | 301 | 201 |
| 402 | 102 | 301 | confirmed | 102 | Riley Chen | 301 | 201 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## customer

| customer_id | display_name | email | created_at |
| --- | --- | --- | --- |
| 101 | Avery Morgan | avery.morgan@example.test | 2026-10-12T09:00:00+00:00 |
| 102 | Riley Chen | riley.chen@example.test | 2026-10-13T10:30:00+00:00 |

## artisan

| artisan_id | display_name | service_area | verified | joined_at |
| --- | --- | --- | --- | --- |
| 201 | Jordan Lee | North District | true | 2026-09-01T08:15:00+00:00 |

## service_listing

| listing_id | artisan_id | title | category | hourly_rate | active |
| --- | --- | --- | --- | --- | --- |
| 301 | 201 | Bicycle Tune-Up | Repair | 45 | true |

## booking

| booking_id | customer_id | listing_id | scheduled_start | status | agreed_price | created_at |
| --- | --- | --- | --- | --- | --- | --- |
| 401 | 101 | 301 | 2026-11-10T19:00:00+00:00 | pending | 67.5 | 2026-10-20T12:00:00+00:00 |
| 402 | 102 | 301 | 2026-11-11T15:00:00+00:00 | confirmed | 90 | 2026-10-21T13:00:00+00:00 |

## Dependencies

- customer: (customer_id) → display_name, email, created_at
- artisan: (artisan_id) → display_name, service_area, verified, joined_at
- service_listing: (listing_id) → artisan_id, title, category, hourly_rate, active
- booking: (booking_id) → customer_id, listing_id, scheduled_start, status, agreed_price, created_at

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
