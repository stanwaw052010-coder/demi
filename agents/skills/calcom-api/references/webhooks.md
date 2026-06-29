# Webhooks API Reference

Detailed documentation for webhook management in the Cal.diy API v2.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v2/webhooks | List webhooks |
| POST | /v2/webhooks | Create a webhook |
| GET | /v2/webhooks/{webhookId} | Get a webhook |
| PATCH | /v2/webhooks/{webhookId} | Update a webhook |
| DELETE | /v2/webhooks/{webhookId} | Delete a webhook |

## Webhook Scopes

Webhooks can be created at multiple levels:

| Scope | Endpoint |
|-------|----------|
| Account-wide | `/v2/webhooks` |
| Event-type specific | `/v2/event-types/{eventTypeId}/webhooks` |
| Organization-wide | `/v2/organizations/{orgId}/webhooks` |
| OAuth client | `/v2/oauth-clients/{clientId}/webhooks` |

## Create a Webhook

```http
POST /v2/webhooks
Content-Type: application/json

{
  "subscriberUrl": "https://your-app.com/webhook",
  "triggers": ["BOOKING_CREATED", "BOOKING_CANCELLED"],
  "active": true,
  "secret": "your_webhook_secret"
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| subscriberUrl | string | HTTPS URL to receive webhook events |
| triggers | array | Event types to subscribe to |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| active | boolean | Whether webhook is active (default: true) |
| secret | string | Secret for payload signature verification |
| payloadTemplate | string | Custom payload template |

## Trigger Events

| Trigger | Description |
|---------|-------------|
| `BOOKING_CREATED` | New booking created |
| `BOOKING_CANCELLED` | Booking was cancelled |
| `BOOKING_RESCHEDULED` | Booking was rescheduled |
| `BOOKING_CONFIRMED` | Booking confirmed by host |
| `BOOKING_REJECTED` | Booking declined by host |
| `BOOKING_REQUESTED` | Booking requested (needs confirmation) |
| `BOOKING_NO_SHOW_UPDATED` | Attendee marked as no-show |
| `MEETING_STARTED` | Video meeting started |
| `MEETING_ENDED` | Video meeting ended |
| `RECORDING_READY` | Recording is available |
| `RECORDING_TRANSCRIPTION_GENERATED` | Transcription is ready |
| `FORM_SUBMITTED` | Routing form submitted |
| `OOO_CREATED` | Out of office entry created |
| `OOO_DELETED` | Out of office entry removed |

## Webhook Payload

Example payload for `BOOKING_CREATED`:

```json
{
  "triggerEvent": "BOOKING_CREATED",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "payload": {
    "uid": "abc123def456",
    "title": "30 Minute Meeting",
    "start": "2024-01-15T14:00:00.000Z",
    "end": "2024-01-15T14:30:00.000Z",
    "status": "accepted",
    "eventTypeId": 123,
    "attendees": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "timeZone": "America/New_York"
      }
    ],
    "organizer": {
      "name": "Jane Smith",
      "email": "jane@company.com"
    }
  }
}
```

## Signature Verification

Webhooks include an HMAC-SHA256 signature for security verification:

```
X-Cal-Signature-256: sha256=<hmac_hex_digest>
```

Verify in Node.js:

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  const expectedSignature = `sha256=${hmac.digest('hex')}`;
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## Custom Payload Templates

Reshape webhook data using template variables:

```json
{
  "payloadTemplate": "{\"event\": \"{{triggerEvent}}\", \"bookingId\": \"{{payload.uid}}\", \"attendee\": \"{{payload.attendees.0.email}}\"}"
}
```

Available template variables:
- `{{triggerEvent}}` — the event type
- `{{payload.*}}` — any field from the standard payload

## Retry Strategy

Failed deliveries are retried with exponential backoff:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 5 minutes |
| 3 | 30 minutes |
| 4 | 2 hours |
| 5 | 8 hours |

After 5 failed attempts over 24 hours, the webhook is marked as failed.

## Best Practices

1. **Always verify signatures** — validate `X-Cal-Signature-256` before processing
2. **Respond quickly** — return 200 within 5 seconds; process async if needed
3. **Idempotent processing** — handle duplicate deliveries gracefully (retries happen)
4. **HTTPS only** — subscriber URLs must use HTTPS
5. **Comprehensive logging** — log all received payloads for debugging
6. **Monitor failures** — set up alerts for consecutive webhook failures
