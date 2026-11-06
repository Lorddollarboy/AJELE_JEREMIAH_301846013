// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("booking_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("booking_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "booking_requested",
                    "booking_confirmed"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "booking"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "booking_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("booking_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "booking_requested",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "booking",
            "key": {
                "booking_id": 401
            },
            "snapshot": {
                "booking_id": 401,
                "customer_id": 101,
                "listing_id": 301,
                "scheduled_start": "2026-11-10T14:00:00-05:00",
                "status": "pending",
                "agreed_price": 67.5,
                "created_at": "2026-10-20T12:00:00Z"
            }
        },
        "embedded": {
            "service_listing": [
                {
                    "key": {
                        "listing_id": 301
                    },
                    "snapshot": {
                        "listing_id": 301,
                        "artisan_id": 201,
                        "title": "Bicycle Tune-Up",
                        "category": "Repair",
                        "hourly_rate": 45,
                        "active": true
                    },
                    "via": [
                        "booking.listing_id → service_listing"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 101
                    },
                    "via": [
                        "booking.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "booking_confirmed",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "booking",
            "key": {
                "booking_id": 401
            },
            "snapshot": {
                "booking_id": 401,
                "customer_id": 101,
                "listing_id": 301,
                "scheduled_start": "2026-11-10T14:00:00-05:00",
                "status": "pending",
                "agreed_price": 67.5,
                "created_at": "2026-10-20T12:00:00Z"
            }
        },
        "embedded": {
            "service_listing": [
                {
                    "key": {
                        "listing_id": 301
                    },
                    "snapshot": {
                        "listing_id": 301,
                        "artisan_id": 201,
                        "title": "Bicycle Tune-Up",
                        "category": "Repair",
                        "hourly_rate": 45,
                        "active": true
                    },
                    "via": [
                        "booking.listing_id → service_listing"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 101
                    },
                    "via": [
                        "booking.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "cancellation_reason": "illustrative cancellation_reason",
                "confirmation_note": "illustrative confirmation_note",
                "quoted_price": "illustrative quoted_price"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "booking_requested",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "booking",
            "key": {
                "booking_id": 402
            },
            "snapshot": {
                "booking_id": 402,
                "customer_id": 102,
                "listing_id": 301,
                "scheduled_start": "2026-11-11T15:00:00Z",
                "status": "confirmed",
                "agreed_price": 90,
                "created_at": "2026-10-21T13:00:00+00:00"
            }
        },
        "embedded": {
            "service_listing": [
                {
                    "key": {
                        "listing_id": 301
                    },
                    "snapshot": {
                        "listing_id": 301,
                        "artisan_id": 201,
                        "title": "Bicycle Tune-Up",
                        "category": "Repair",
                        "hourly_rate": 45,
                        "active": true
                    },
                    "via": [
                        "booking.listing_id → service_listing"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 102
                    },
                    "via": [
                        "booking.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "booking_confirmed",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "booking",
            "key": {
                "booking_id": 402
            },
            "snapshot": {
                "booking_id": 402,
                "customer_id": 102,
                "listing_id": 301,
                "scheduled_start": "2026-11-11T15:00:00Z",
                "status": "confirmed",
                "agreed_price": 90,
                "created_at": "2026-10-21T13:00:00+00:00"
            }
        },
        "embedded": {
            "service_listing": [
                {
                    "key": {
                        "listing_id": 301
                    },
                    "snapshot": {
                        "listing_id": 301,
                        "artisan_id": 201,
                        "title": "Bicycle Tune-Up",
                        "category": "Repair",
                        "hourly_rate": 45,
                        "active": true
                    },
                    "via": [
                        "booking.listing_id → service_listing"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 102
                    },
                    "via": [
                        "booking.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "cancellation_reason": "illustrative cancellation_reason",
                "confirmation_note": "illustrative confirmation_note",
                "quoted_price": "illustrative quoted_price"
            }
        }
    }
]));
  await db.getCollection("booking_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("booking_events").find({"eventType":"booking_requested"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("booking_events").find({"source.key.booking_id":401}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("booking_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("booking_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("booking_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "booking_requested",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "booking",
        "key": {
            "booking_id": 401
        },
        "snapshot": {
            "booking_id": 401,
            "customer_id": 101,
            "listing_id": 301,
            "scheduled_start": "2026-11-10T14:00:00-05:00",
            "status": "pending",
            "agreed_price": 67.5,
            "created_at": "2026-10-20T12:00:00Z"
        }
    },
    "embedded": {
        "service_listing": [
            {
                "key": {
                    "listing_id": 301
                },
                "snapshot": {
                    "listing_id": 301,
                    "artisan_id": 201,
                    "title": "Bicycle Tune-Up",
                    "category": "Repair",
                    "hourly_rate": 45,
                    "active": true
                },
                "via": [
                    "booking.listing_id → service_listing"
                ]
            }
        ]
    },
    "references": {
        "customer": [
            {
                "key": {
                    "customer_id": 101
                },
                "via": [
                    "booking.customer_id → customer"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("booking_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "booking_requested",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "booking",
        "key": {
            "booking_id": 401
        },
        "snapshot": {
            "booking_id": 401,
            "customer_id": 101,
            "listing_id": 301,
            "scheduled_start": "2026-11-10T14:00:00-05:00",
            "status": "pending",
            "agreed_price": 67.5,
            "created_at": "2026-10-20T12:00:00Z"
        }
    },
    "embedded": {
        "service_listing": [
            {
                "key": {
                    "listing_id": 301
                },
                "snapshot": {
                    "listing_id": 301,
                    "artisan_id": 201,
                    "title": "Bicycle Tune-Up",
                    "category": "Repair",
                    "hourly_rate": 45,
                    "active": true
                },
                "via": [
                    "booking.listing_id → service_listing"
                ]
            }
        ]
    },
    "references": {
        "customer": [
            {
                "key": {
                    "customer_id": 101
                },
                "via": [
                    "booking.customer_id → customer"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("booking_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
