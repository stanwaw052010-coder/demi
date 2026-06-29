# Calendars API Reference

Detailed documentation for calendar integration endpoints in the Cal.diy API v2.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v2/calendars | List connected calendars |
| GET | /v2/calendars/busy-times | Get busy times from calendars |
| POST | /v2/calendars/{calendar}/connect | Connect a calendar |
| DELETE | /v2/calendars/{calendar}/disconnect | Disconnect a calendar |
| GET | /v2/calendars/{calendar}/check | Check calendar connection status |
| GET | /v2/calendars/credentials/{credentialId} | Get calendar credentials |
| GET | /v2/calendars/destination-calendars | Get destination calendars |
| PUT | /v2/calendars/destination-calendars | Update destination calendars |

## Supported Calendar Platforms

| Platform | Identifier |
|----------|-----------|
| Google Calendar | `google_calendar` |
| Microsoft 365 Outlook | `office365_calendar` |
| Apple iCloud (CalDAV) | `apple_calendar` |
| Generic CalDAV | `caldav_calendar` |

## List Connected Calendars

```http
GET /v2/calendars
Authorization: Bearer cal_live_...
```

### Response

```json
{
  "status": "success",
  "data": {
    "connectedCalendars": [
      {
        "integration": {
          "type": "google_calendar",
          "title": "Google Calendar"
        },
        "calendars": [
          {
            "externalId": "primary",
            "name": "My Calendar",
            "primary": true,
            "readOnly": false,
            "isSelected": true
          }
        ]
      }
    ],
    "destinationCalendar": {
      "externalId": "primary",
      "integration": "google_calendar"
    }
  }
}
```

## Get Busy Times

Check occupied time slots across connected calendars.

```http
GET /v2/calendars/busy-times
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| startTime | string | Yes | ISO 8601 start of date range |
| endTime | string | Yes | ISO 8601 end of date range |
| loggedInUsersTz | string | No | User's timezone |
| credentialId | number | No | Specific calendar credential ID |

### Response

```json
{
  "status": "success",
  "data": [
    {
      "start": "2024-01-15T10:00:00.000Z",
      "end": "2024-01-15T11:00:00.000Z",
      "title": "Existing Meeting",
      "source": "google_calendar"
    }
  ]
}
```

## How Availability Works

When checking available slots, the API:
1. Fetches busy times from all **selected** calendars
2. Excludes those busy times from available slots
3. Identifies Cal.diy-created events by their UID format ending in `@Cal.diy`

## Managing Selected Calendars

Selected calendars are the ones monitored for conflicts. Update which calendars to monitor:

```http
PUT /v2/calendars/destination-calendars
Content-Type: application/json

{
  "integration": "google_calendar",
  "externalId": "work@company.com"
}
```

## Best Practices

1. Verify connection status before performing operations
2. Handle OAuth token expiration — tokens need periodic refresh
3. Respect rate limits when fetching busy times
4. Cache busy times results for short periods to reduce API calls
5. Use webhooks instead of continuous polling for calendar changes
