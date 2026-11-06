# Portfolio 1 — Database Design and Modelling

I organised the data into customer, artisan, service_listing, booking. The design document explains the fields, keys, relationships and business rules. The normalisation document shows the sample tables at 1NF, 2NF and 3NF.

## Database checks

| Table | Rows |
| --- | --- |
| customer | 2 |
| artisan | 1 |
| service_listing | 1 |
| booking | 2 |

The 12 invalid inserts were rejected at their expected constraints, and the valid sample rows remained unchanged.

## Files

- [Design](AJELE_JEREMIAH_301846013_P1_Design.md)
- [ER diagram](AJELE_JEREMIAH_301846013_P1_ERDiagram.md)
- [Normalisation](AJELE_JEREMIAH_301846013_P1_Normalisation.md)
- [Schema](AJELE_JEREMIAH_301846013_P1_Schema.sql)
- [Sample data](AJELE_JEREMIAH_301846013_P1_SampleData.sql)
- [Constraint tests](AJELE_JEREMIAH_301846013_P1_ConstraintTests.sql)
- [Table and constraint evidence](screenshots/AJELE_JEREMIAH_301846013_P1_DatabaseResults.png)

## Run the SQL

Create a fresh PostgreSQL database. Run the schema first, then the sample data. Run the deliberately invalid statements in ConstraintTests.sql individually outside a transaction; each is expected to produce an error.

## References

- [PostgreSQL — constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)

