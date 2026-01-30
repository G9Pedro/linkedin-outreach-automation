# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Campaigns

### List All Campaigns

```http
GET /api/campaigns
```

**Response:**
```json
[
  {
    "id": "clx...",
    "name": "Tech Founders Outreach",
    "description": "Target SaaS founders",
    "targetIndustry": "Technology",
    "status": "ACTIVE",
    "createdAt": "2026-01-30T10:00:00Z",
    "_count": {
      "prospects": 150
    },
    "analytics": {
      "connectionRate": 32.5,
      "responseRate": 18.2,
      "conversions": 5
    }
  }
]
```

### Create Campaign

```http
POST /api/campaigns
```

**Request Body:**
```json
{
  "name": "Tech Founders Outreach",
  "description": "Target SaaS founders in Series A-B",
  "targetIndustry": "Technology",
  "messageTemplate": {
    "connectionMsg": "Hi {firstName}, impressed by {company}...",
    "followUp1": "Thanks for connecting...",
    "followUp2": "Following up...",
    "followUp3": "Last follow-up...",
    "followUp1Delay": 3,
    "followUp2Delay": 7,
    "followUp3Delay": 14
  }
}
```

### Get Campaign Details

```http
GET /api/campaigns/:id
```

**Response:**
```json
{
  "id": "clx...",
  "name": "Tech Founders Outreach",
  "messageTemplate": {
    "connectionMsg": "...",
    "followUp1": "..."
  },
  "prospects": [...],
  "analytics": {...}
}
```

### Update Campaign

```http
PATCH /api/campaigns/:id
```

**Request Body:**
```json
{
  "status": "PAUSED",
  "name": "Updated Campaign Name"
}
```

### Delete Campaign

```http
DELETE /api/campaigns/:id
```

## Prospects

### Add Prospects to Campaign

```http
POST /api/campaigns/:id/prospects
```

**Request Body:**
```json
{
  "prospects": [
    {
      "linkedinUrl": "https://linkedin.com/in/johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "headline": "CEO at TechCorp",
      "industry": "Technology",
      "company": "TechCorp",
      "location": "San Francisco"
    }
  ]
}
```

**Response:**
```json
{
  "count": 1
}
```

## Automation

### Start Campaign (Send Connection Requests)

```http
POST /api/campaigns/:id/start
```

**Response:**
```json
{
  "success": true,
  "sent": 15,
  "failed": 0,
  "remaining": 35
}
```

### Process Follow-ups

```http
POST /api/automation/follow-ups
```

**Response:**
```json
{
  "success": true,
  "sent": 23,
  "skipped": 2
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request body",
  "details": "Missing required field: name"
}
```

### 404 Not Found
```json
{
  "error": "Campaign not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create campaign",
  "message": "Database connection error"
}
```

## Rate Limiting

- Max 100 requests per minute per IP
- Max 1000 requests per hour per user

## Authentication (Coming Soon)

```http
Authorization: Bearer <token>
```

## Webhooks (Coming Soon)

```http
POST https://your-app.com/webhook
```

**Payload:**
```json
{
  "event": "prospect.replied",
  "data": {
    "prospectId": "...",
    "campaignId": "...",
    "message": "..."
  }
}
```