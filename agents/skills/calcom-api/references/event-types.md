# Event Types API Reference

Detailed documentation for event type management endpoints in the Cal.diy API v2.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v2/event-types | List event types |
| POST | /v2/event-types | Create an event type |
| GET | /v2/event-types/{eventTypeId} | Get an event type |
| PATCH | /v2/event-types/{eventTypeId} | Update an event type |
| DELETE | /v2/event-types/{eventTypeId} | Delete an event type |

## List Event Types

```http
GET /v2/event-types
Authorization: Bearer cal_live_...
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| take | number | No | Number of results to return |
| skip | number | No | Pagination offset |

### Response

```json
{
  "status": "success",
  "data": [
    {
      "id": 123,
      "title": "30 Minute Meeting",
      "slug": "30min",
      "length": 30,
      "description": "A quick 30 minute call",
      "locations": [
        { "type": "integrations:daily" }
      ],
      "hidden": false,
      "requiresConfirmation": false
    }
  ]
}
```

## Create an Event Type

```http
POST /v2/event-types
Content-Type: application/json

{
  "title": "30 Minute Meeting",
  "slug": "30min",
  "length": 30,
  "description": "A quick 30 minute call",
  "locations": [
    { "type": "integrations:daily" }
  ]
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| title | string | Display name of the event type |
| slug | string | URL-friendly identifier |
| length | number | Duration in minutes |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| description | string | Event description |
| locations | array | Where the meeting takes place |
| hidden | boolean | Hide from public booking page |
| requiresConfirmation | boolean | Host must confirm each booking |
| minimumBookingNotice | number | Minimum notice in minutes |
| beforeEventBuffer | number | Buffer time before event in minutes |
| afterEventBuffer | number | Buffer time after event in minutes |
| slotInterval | number | Slot interval in minutes |
| bookingLimits | object | Daily/weekly/monthly booking limits |
| bookingFields | array | Custom form fields for attendees |

## Meeting Locations

Supported location types:

| Type | Description |
|------|-------------|
| `integrations:daily` | Cal Video (built-in) |
| `integrations:zoom` | Zoom meeting |
| `integrations:google:meet` | Google Meet |
| `integrations:office365_video` | Microsoft Teams |
| `inPerson` | Physical address |
| `phone` | Phone call |
| `link` | Custom link |

### Location Example

```json
{
  "locations": [
    {
      "type": "integrations:zoom",
      "link": "https://zoom.us/j/123456789"
    }
  ]
}
```

## Custom Booking Fields

Collect additional information from attendees:

```json
{
  "bookingFields": [
    {
      "name": "company",
      "type": "text",
      "label": "Company Name",
      "required": true,
      "placeholder": "Acme Inc."
    },
    {
      "name": "topic",
      "type": "select",
      "label": "Meeting Topic",
      "required": true,
      "options": [
        { "label": "Sales", "value": "sales" },
        { "label": "Support", "value": "support" }
      ]
    }
  ]
}
```

### Supported Field Types

| Type | Description |
|------|-------------|
| `text` | Single-line text input |
| `textarea` | Multi-line text input |
| `select` | Dropdown selection |
| `multiselect` | Multiple selections |
| `radio` | Radio button group |
| `checkbox` | Checkbox |
| `phone` | Phone number input |
| `email` | Email input |

## Scheduling Controls

```json
{
  "minimumBookingNotice": 60,
  "beforeEventBuffer": 15,
  "afterEventBuffer": 15,
  "slotInterval": 30,
  "bookingLimits": {
    "PER_DAY": 5,
    "PER_WEEK": 20,
    "PER_MONTH": 50
  }
}
```

## Team Event Types

Create event types scoped to a team:

```http
POST /v2/organizations/{orgId}/teams/{teamId}/event-types
```

### Scheduling Modes

| Mode | Description |
|------|-------------|
| `ROUND_ROBIN` | Distribute bookings among team members |
| `COLLECTIVE` | All team members attend |
| `MANAGED` | Parent-child structure for managed events |

## Private Booking Links

Generate a private link for restricted access booking:

```http
POST /v2/event-types/{eventTypeId}/generate-hash
```
