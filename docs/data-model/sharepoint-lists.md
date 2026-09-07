# SharePoint Data Model

## Overview

The iDS Hub application uses SharePoint Lists and Libraries to store and manage data. This document outlines the data model structure, relationships, and schemas.

## Core Lists

### 1. Training Tracker List

**Purpose**: Track user training completion and progress

**Schema**:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| ID | Integer | Yes | Auto-incremented ID |
| Title | Text | Yes | Training course name |
| Description | Note | No | Course description |
| Category | Choice | Yes | Training category (Security, Compliance, Skills) |
| DueDate | Date | Yes | Training completion deadline |
| Status | Choice | Yes | Not Started, In Progress, Completed, Overdue |
| CompletedBy | User | No | User who completed training |
| CompletionDate | Date | No | When training was completed |
| Score | Number | No | Training assessment score |
| ExpiresOn | Date | No | Certification expiration date |
| Owner | User | Yes | Training owner/manager |

**Views**:
- All Training
- Overdue Training
- Completed This Month
- By Category
- By User

### 2. Secure Behavior Score List

**Purpose**: Track Secure Behavior Score (SBS) metrics

**Schema**:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| ID | Integer | Yes | Auto-incremented ID |
| User | User | Yes | User being scored |
| ScoreValue | Number | Yes | Current SBS value (0-100) |
| ScoreDate | Date | Yes | Date score was calculated |
| Category | Choice | Yes | Security, Compliance, Awareness |
| Details | Note | No | Score breakdown details |
| Status | Choice | Yes | Healthy, At Risk, Critical |
| LastUpdated | Date | Yes | Last update timestamp |

**Views**:
- Current Scores
- By User
- By Status
- Trends
- Department Summary

### 3. Action Items List

**Purpose**: Track recommended actions and their completion

**Schema**:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| ID | Integer | Yes | Auto-incremented ID |
| Title | Text | Yes | Action item title |
| Description | Note | No | Detailed description |
| AssignedTo | User | Yes | Person responsible |
| DueDate | Date | Yes | Completion deadline |
| Priority | Choice | Yes | High, Medium, Low |
| Status | Choice | Yes | New, In Progress, Completed, Blocked |
| Category | Choice | Yes | Training, Security, Compliance |
| RelatedTraining | Lookup | No | Link to training (if applicable) |
| CompletedDate | Date | No | Actual completion date |
| Notes | Note | No | Progress notes |

**Views**:
- My Actions
- By Priority
- By Status
- Overdue
- By Department

### 4. Resources Library

**Purpose**: Store and organize training materials and resources

**Schema**:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| Name | File | Yes | Resource file |
| Title | Text | Yes | Resource title |
| Description | Note | No | Resource description |
| Type | Choice | Yes | Document, Video, Link, Tool |
| Category | Choice | Yes | Training, Security, Compliance, Helpdesk |
| RelatedTraining | Lookup | No | Link to training course |
| Author | User | Yes | Resource creator |
| Created | Date | Yes | Creation date |
| Modified | Date | Yes | Last modification |
| Version | Text | Yes | Resource version |
| IsPublic | Boolean | Yes | Public or internal only |

**Views**:
- All Resources
- By Category
- By Type
- Recently Updated
- Most Popular

### 5. Team Insights List

**Purpose**: Store aggregated team analytics and reporting data

**Schema**:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| ID | Integer | Yes | Auto-incremented ID |
| Department | Text | Yes | Department name |
| TeamName | Text | Yes | Team name |
| ReportDate | Date | Yes | Report period date |
| TotalUsers | Number | Yes | Total team members |
| TrainingCompleted | Number | Yes | Completed trainings |
| CompletionRate | Number | Yes | Percentage (0-100) |
| AvgScore | Number | Yes | Average SBS score |
| RiskScore | Number | No | Team risk assessment |
| Status | Choice | Yes | On Track, At Risk, Needs Attention |
| Notes | Note | No | Team insights notes |

**Views**:
- All Departments
- By Department
- At Risk Teams
- Completion Trends
- Monthly Summary

### 6. Admin Settings List

**Purpose**: Store application configuration and feature flags

**Schema**:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| ID | Integer | Yes | Auto-incremented ID |
| SettingName | Text | Yes | Configuration key |
| SettingValue | Text | Yes | Configuration value |
| Type | Choice | Yes | Boolean, Text, Number, JSON |
| Description | Note | No | Setting purpose |
| LastModified | Date | Yes | Last change date |
| ModifiedBy | User | Yes | Who changed it |
| Category | Choice | Yes | Feature Flags, Theming, Security, Integration |

**Example Settings**:
```
- Feature.WelcomeModule: true
- Feature.LearningModule: true
- Feature.SecureBehavior: false
- Feature.TeamInsights: true
- Theme.PrimaryColor: #0078D4
- Theme.SecondaryColor: #50E6FF
```

## Data Relationships

```
User
├── Training Completions (one-to-many)
│   └── Training Tracker
├── Action Items (one-to-many)
│   └── Action Items List
├── SBS Scores (one-to-many)
│   └── Secure Behavior Score
└── Team Membership (many-to-many)
    └── Team Insights

Training Course
├── Related Training Links (in Action Items)
├── Resources (one-to-many)
│   └── Resources Library
└── Completion Records
    └── Training Tracker
```

## Sample Data

### Training Tracker Sample

```json
{
  "id": 1,
  "title": "Security Awareness Training 2024",
  "category": "Security",
  "dueDate": "2024-12-31",
  "status": "In Progress",
  "completedBy": "john.doe@company.com",
  "score": 85,
  "owner": "security-team@company.com"
}
```

### SBS Sample

```json
{
  "id": 1,
  "user": "john.doe@company.com",
  "scoreValue": 78,
  "scoreDate": "2024-01-15",
  "category": "Security",
  "status": "Healthy",
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

## List Provisioning

### PowerShell Provisioning

```powershell
$siteUrl = "https://tenant.sharepoint.com/sites/ids-hub"
Connect-PnPOnline -Url $siteUrl

# Create Training Tracker List
New-PnPList -Title "Training Tracker" -Template GenericList

# Add columns
Add-PnPField -List "Training Tracker" -DisplayName "Category" -InternalName "Category" -Type Choice -Choices "Security", "Compliance", "Skills"
Add-PnPField -List "Training Tracker" -DisplayName "Status" -InternalName "Status" -Type Choice -Choices "Not Started", "In Progress", "Completed", "Overdue"
Add-PnPField -List "Training Tracker" -DisplayName "DueDate" -InternalName "DueDate" -Type DateTime
Add-PnPField -List "Training Tracker" -DisplayName "Score" -InternalName "Score" -Type Number
```

### PnP Provisioning Template

See `sharepoint/provisioning/template.xml` for complete PnP template.

## Permissions

### List-Level Permissions

- **Training Tracker**: Everyone (Read), Managers (Edit), Admins (Full Control)
- **SBS Data**: Everyone (Read), Analytics Team (Edit), Admins (Full Control)
- **Admin Settings**: Admins only (Full Control)
- **Resources**: Everyone (Read), Authors (Edit/Contribute), Admins (Full Control)

## Data Validation Rules

### Training Tracker

- ✓ DueDate must be in the future
- ✓ Score must be 0-100
- ✓ Title is required
- ✓ Category is required
- ✓ Status reflects actual state

### Action Items

- ✓ DueDate cannot be before today
- ✓ AssignedTo is required
- ✓ Status matches workflow
- ✓ Priority is set
- ✓ Completed date only set when Status = Completed

### SBS

- ✓ ScoreValue is 0-100
- ✓ ScoreDate is valid date
- ✓ User exists in organization
- ✓ Status matches score ranges

## Archival & Retention

### Archival Policy

- Training records: Keep indefinitely (compliance)
- Action items: Archive after 2 years
- Resources: Keep current versions, archive old versions
- SBS data: Keep 3-year rolling window

### Backup

- Daily automated backup to secure location
- Monthly archive to long-term storage
- Disaster recovery plan documented

---

For architecture details, see [Solution Overview](../architecture/solution-overview.md).
