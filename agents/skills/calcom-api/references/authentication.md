# Cal.diy API v2 Authentication

## Authentication Methods

### API Key Authentication

The primary authentication method for most developers. Obtain keys from Settings > Developer > API Keys.

Key formats:
- Production: `cal_live_...`
- Sandbox/Test: `cal_test_...`

Include the key in every request as a Bearer token:

```http
Authorization: Bearer cal_live_abc123xyz...
```

### Platform Authentication (OAuth)

For organizations managing multiple users on behalf of others. Requires three headers:

```http
x-cal-client-id: <your_oauth_client_id>
x-cal-secret-key: <your_oauth_secret>
Authorization: Bearer <managed_user_access_token>
```

## Security Best Practices

- Store API keys in environment variables, never in code
- Never embed keys in client-side applications
- Regularly rotate credentials using the refresh endpoint
- Monitor your dashboard for suspicious activity
- Always transmit requests over HTTPS
- Use minimal permission scoping

## Validating Your API Key

Use the `/v2/me` endpoint to verify your key is valid:

```http
GET /v2/me
Authorization: Bearer cal_live_abc123xyz...
```

## Error Handling

| HTTP Status | Meaning |
|-------------|---------|
| 401 | Authentication failure — invalid or missing key |
| 403 | Insufficient permissions for this operation |
| 429 | Rate limit exceeded |

Rate limiting uses exponential backoff. Check response headers:
- `X-RateLimit-Remaining`: Remaining requests in current window
- `Retry-After`: Seconds to wait before retrying

## Token Refresh

For platform integrations, refresh managed user tokens before expiration:

```http
POST /v2/oauth/{clientId}/refresh
Content-Type: application/json

{
  "refreshToken": "<current_refresh_token>"
}
```
