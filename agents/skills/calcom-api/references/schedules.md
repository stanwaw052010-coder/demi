# Schedules API Reference

Detailed documentation for schedule management endpoints in the Cal.diy API v2.

Schedules define when a user is available for bookings through working hours, date-specific exceptions, and timezone specification.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v2/schedules | List all schedules |
| POST | /v2/schedules | Create a schedule |
| GET | /v2/schedules/{scheduleId} | Get a schedule |
| PATCH | /v2/schedules/{scheduleId} | Update a schedule |
| DELETE | /v2/schedules/{scheduleId} | Delete a schedule |

## List Schedules

```http
GET /v2/schedules
Authorization: Bearer cal_live_...
```

### Response

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Working Hours",
      "timeZone": "America/New_York",
      "isDefault": true,
      "isManaged": false,
      "readOnly": false,
      "availability": [
        {
          "days": [1, 2, 3, 4, 5],
          "startTime": "09:00",
          "endTime": "17:00"
        }
      ]
    }
  ]
}
```

## Create a Schedule

```http
POST /v2/schedules
Content-Type: application/json

{
  "name": "Working Hours",
  "timeZone": "America/New_York",
  "isDefault": true,
  "availability": [
    {
      "days": [1, 2, 3, 4, 5],
      "startTime": "09:00",
      "endTime": "17:00"
    }
  ]
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Schedule name |
| timeZone | string | Yes | IANA timezone identifier |
| isDefault | boolean | No | Set as the default schedule |
| availability | array | No | Working hours configuration |

### Availability Format

Days of week (0=Sunday, 1=Monday, ..., 6=Saturday):

```json
{
  "availability": [
    {
      "days": [1, 2, 3, 4, 5],
      "startTime": "09:00",
      "endTime": "17:00"
    },
    {
      "days": [6],
      "startTime": "10:00",
      "endTime": "14:00"
    }
  ]
}
```

## Update a Schedule

```http
PATCH /v2/schedules/{scheduleId}
Content-Type: application/json

{
  "name": "Updated Working Hours",
  "availability": [
    {
      "days": [1, 2, 3, 4, 5],
      "startTime": "08:00",
      "endTime": "18:00"
    }
  ]
}
```

## Date Overrides

Add exceptions for specific dates (e.g., holidays or special hours):

```json
{
  "dateOverrides": [
    {
      "date": "2024-12-25",
      "availability": null
    },
    {
      "date": "2024-12-24",
      "availability": [
        {
          "startTime": "09:00",
          "endTime": "13:00"
        }
      ]
    }
  ]
}
```

- `null` availability = completely unavailable on that date
- Specific times = custom hours for that date

## Response Time Formats

The API returns working hours times in two formats:

| Format | Example | Notes |
|--------|---------|-------|
| Minutes since midnight | `540` | 9:00 AM = 540 minutes |
| ISO timestamp | `"1970-01-01T09:00:00.000Z"` | Date portion is ignored |

## Schedule Metadata

| Field | Type | Description |
|-------|------|-------------|
| `isDefault` | boolean | Whether this is the user's default schedule |
| `readOnly` | boolean | Cannot be modified (e.g., org-managed) |
| `isManaged` | boolean | Managed by an organization |

## Organization & Team Schedules

Manage schedules at organization and team level:

```http
GET /v2/organizations/{orgId}/schedules
GET /v2/organizations/{orgId}/teams/{teamId}/users/{userId}/schedules
```

## Best Practices

1. Always specify the `timeZone` field — never assume UTC
2. Use `dateOverrides` for holidays and exceptions instead of deleting/recreating schedules
3. Validate availability after creation by checking slot availability
4. Each user must have at least one schedule (the default)
5. Don't rely on schedules alone for buffer management — use event type `beforeEventBuffer` and `afterEventBuffer`
