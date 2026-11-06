# Artisan and technician marketplace — ER diagram

```mermaid
erDiagram
    direction LR
    customer {
        bigint customer_id PK
        text display_name
        text email UK
        timestamptz created_at
    }
    artisan {
        bigint artisan_id PK
        text display_name
        text service_area
        boolean verified
        timestamptz joined_at
    }
    service_listing {
        bigint listing_id PK
        bigint artisan_id FK
        text title
        text category
        numeric hourly_rate
        boolean active
    }
    booking {
        bigint booking_id PK
        bigint customer_id FK
        bigint listing_id FK
        timestamptz scheduled_start
        text status
        numeric agreed_price
        timestamptz created_at
    }
    artisan ||--o{ service_listing : "artisan_id"
    customer ||--o{ booking : "customer_id"
    service_listing ||--o{ booking : "listing_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/AJELE_JEREMIAH_301846013_ERDiagram.png)
