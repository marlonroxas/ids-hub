# Power Automate Integration

## Overview

iDS Hub can integrate with Power Automate flows to automate notifications, approvals, and data synchronization.

## Common Integration Patterns

### 1. Notification Flows

**Trigger**: Training assignment created in SharePoint List
**Action**: Send email notification to assigned user

```json
{
  "trigger": "When an item is created",
  "list": "Training Tracker",
  "actions": [
    {
      "action": "Send an email (V2)",
      "to": "@{triggerOutputs()['body/AssignedTo/Email']}",
      "subject": "New Training Assigned: @{triggerOutputs()['body/Title']}",
      "body": "Please complete this training by @{triggerOutputs()['body/DueDate']}"
    }
  ]
}
```

### 2. Approval Flows

**Trigger**: High-priority action item created
**Action**: Send approval request to manager

```json
{
  "trigger": "When an item is created",
  "filter": "@{triggerOutputs()['body/Priority']} eq 'Critical'",
  "actions": [
    {
      "action": "Start and wait for an approval",
      "approvalType": "Approve/Reject - Single",
      "assignedTo": "@{triggerOutputs()['body/ManagerEmail']}",
      "title": "Action Item Approval: @{triggerOutputs()['body/Title']}"
    }
  ]
}
```

### 3. Data Sync Flows

**Trigger**: Training completion in iDS Hub
**Action**: Update SBS score and Team Insights

```json
{
  "trigger": "HTTP webhook from iDS Hub",
  "actions": [
    {
      "action": "Update item in SharePoint",
      "list": "Secure Behavior Score",
      "filters": "[User] = @{triggerBody()['userId']}",
      "updates": {
        "ScoreValue": "@{triggerBody()['newScore']}",
        "LastUpdated": "@{utcNow()}"
      }
    }
  ]
}
```

## REST API Endpoints

### Trigger Training Notification

```http
POST /api/notifications/training
Content-Type: application/json

{
  "userId": "user@example.com",
  "trainingId": "123",
  "dueDate": "2024-12-31",
  "title": "Security Training"
}
```

### Trigger Action Item Approval

```http
POST /api/approvals/action-item
Content-Type: application/json

{
  "actionItemId": "456",
  "managerId": "manager@example.com",
  "priority": "Critical"
}
```

### Update SBS Score

```http
PUT /api/sbs-scores/{userId}
Content-Type: application/json

{
  "scoreValue": 85,
  "category": "Security",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Setting Up Flows

### Prerequisites
- Power Automate license
- SharePoint site access
- iDS Hub deployed to SharePoint

### Step 1: Create Flow

1. Go to Power Automate (https://flow.microsoft.com)
2. Click "Create" → "Cloud flow" → "Automated"
3. Choose trigger (e.g., "When an item is created")
4. Select SharePoint site and list

### Step 2: Add Actions

1. Click "+ New step"
2. Add actions (Send email, Update item, etc.)
3. Configure conditions if needed

### Step 3: Test & Publish

1. Save the flow
2. Test with sample data
3. Publish when working correctly

## Webhook Integration

### Setup Webhook Receiver

iDS Hub can receive webhooks from Power Automate:

```typescript
// Webhook endpoint in iDS Hub
POST /api/webhooks/power-automate
X-Webhook-Secret: {secret}
Content-Type: application/json

{
  "eventType": "training-completed",
  "data": {
    "userId": "user@example.com",
    "trainingId": "123",
    "completionDate": "2024-01-15",
    "score": 92
  }
}
```

### Webhook Validation

```typescript
import crypto from 'crypto';

function validateWebhook(body: string, signature: string, secret: string): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('base64');
  
  return hash === signature;
}
```

## Templates & Examples

See `sharepoint/provisioning/` for Power Automate flow templates and examples.

## Troubleshooting

### Flow not triggering
- Check trigger conditions
- Verify list and column names
- Check SharePoint permissions

### Webhook not received
- Verify webhook URL is correct
- Check firewall/proxy settings
- Validate webhook secret

### Email not sending
- Check email syntax
- Verify sender permissions
- Check mail server settings

---

For more information, see [Power Automate Documentation](https://learn.microsoft.com/en-us/power-automate/).
