# Artisan and technician marketplace — database design

My case study records customer, artisan, service_listing, booking.

## Users

- Customers looking for repair or craft services
- Artisans and technicians offering services
- Marketplace staff reviewing listings and bookings

## Main operations

- Publish and maintain service listings
- Request, confirm, or cancel appointments
- Review bookings by service, provider, and date

## Entities

| Entity | Information stored |
| --- | --- |
| customer | A person who requests a marketplace service. |
| artisan | A provider who offers services through the marketplace. |
| service_listing | A service offered by one artisan, with a category and hourly rate. |
| booking | A customer's appointment request for a listed service. |

## customer

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| customer_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- Unique key: (email).

## artisan

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| artisan_id | BIGINT | PK | Yes |
| display_name | TEXT |  | Yes |
| service_area | TEXT |  | Yes |
| verified | BOOLEAN |  | Yes |
| joined_at | TIMESTAMPTZ |  | Yes |


## service_listing

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| listing_id | BIGINT | PK | Yes |
| artisan_id | BIGINT | FK | Yes |
| title | TEXT |  | Yes |
| category | TEXT |  | Yes |
| hourly_rate | NUMERIC(18,2) |  | Yes |
| active | BOOLEAN |  | Yes |
- artisan_id → artisan.artisan_id

## booking

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| booking_id | BIGINT | PK | Yes |
| customer_id | BIGINT | FK | Yes |
| listing_id | BIGINT | FK | Yes |
| scheduled_start | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
| agreed_price | NUMERIC(18,2) |  | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- customer_id → customer.customer_id
- listing_id → service_listing.listing_id

## Relationships and business rules

- Each customer email identifies at most one customer.
- Every service listing must reference an existing artisan.
- A listed service must have an hourly rate greater than zero.
- Every booking must reference an existing customer.
- Every booking must reference an existing service listing.
- An agreed booking price must be greater than zero.
- A listing and scheduled start time may appear in at most one booking whose status is pending or confirmed; cancelled bookings are excluded.

## Assumptions

- All identifiers are synthetic, globally unique UUID values; each table uses one single-column primary key.
- Each listing belongs to exactly one artisan, and each booking refers to exactly one customer and one listing.
- A listing and start time can have at most one pending or confirmed booking; cancelled bookings do not reserve that slot.
- The worked normalization example starts with booking, which has foreign keys to customer and service_listing. Customer details belong in customer, listing details belong in service_listing, and provider details belong in artisan; booking does not duplicate artisan_id.
- Benchmark plan: create 20,000 synthetic bookings, compare a sequential scan with a B-tree index lookup using the same selective scheduled_start date-range filter, and record query plans and elapsed time under the same conditions.

