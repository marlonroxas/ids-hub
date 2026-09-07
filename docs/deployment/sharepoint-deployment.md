# SharePoint Deployment Guide

## Overview

This guide covers deploying the iDS Hub application to SharePoint Online environments (development, staging, and production).

## Prerequisites

- **SharePoint Online** site collection with **App Catalog** enabled
- **Tenant Admin** or **Site Collection Admin** permissions
- Latest **SharePoint Framework** CLI installed
- Application properly built and packaged
- Valid **SharePoint App Catalog** configured

## Deployment Process

### Step 1: Create Production Build

```bash
cd ids-hub-spfx
npm run build
```

Expected output:
```
✓ Build completed successfully
Build folder: dist/
```

### Step 2: Create SharePoint Package

```bash
npm run package:prod
```

This generates:
- `ids-hub.sppkg` – The deployable package
- Located in: `sharepoint/solution/ids-hub.sppkg`

### Step 3: Upload to App Catalog

1. Navigate to your **SharePoint App Catalog**:
   ```
   https://<tenant>.sharepoint.com/sites/appcatalog
   ```

2. Click **Distribute apps for SharePoint**

3. **Upload** the `.sppkg` file:
   - Click **New** → **Files**
   - Select `ids-hub.sppkg`
   - Click **Open**

4. In the dialog:
   - ✅ Check **"Make this solution available to all sites in the organization"**
   - Click **Deploy**

### Step 4: Trust the Application

1. A confirmation dialog will appear
2. Review permissions requested
3. Click **Trust It** to approve

### Step 5: Deploy to Target Site

#### Option A: Add from Site Contents

1. Navigate to target SharePoint site
2. Click **Site Contents** in left navigation
3. Click **+ Add an app**
4. Search for **iDS Hub**
5. Click on the app to install
6. Click **Add** to deploy

#### Option B: Use PowerShell (Bulk Deployment)

```powershell
# Connect to SharePoint Online
Connect-PnPOnline -Url "https://<tenant>.sharepoint.com/sites/targetsite"

# Install app
Install-PnPApp -Identity ids-hub

# Verify installation
Get-PnPApp
```

### Step 6: Post-Deployment Configuration

#### Provision Lists and Libraries

If using SharePoint Lists for data:

```powershell
Connect-PnPOnline -Url "https://<tenant>.sharepoint.com/sites/targetsite"

# Apply provisioning template
Invoke-PnPSiteTemplate -Path "sharepoint/provisioning/template.xml"
```

#### Configure Web Part

1. Go to target page
2. Click **Edit** (pencil icon)
3. Click **+ Add a web part**
4. Search and select **iDS Hub Portal**
5. Configure properties:
   - **Title**: iDS Hub
   - **Feature Modules**: Select features to enable
   - **Data Source**: Mock/SharePoint Lists
   - Click **Save**

#### Feature Flags

Configure in web part properties or site settings:

```json
{
  "features": {
    "welcome": true,
    "home": true,
    "learning": true,
    "secureBehavior": false,
    "actionCenter": true,
    "teamInsights": false,
    "reports": false
  }
}
```

### Step 7: Verification

✅ **Checklist**:

- [ ] App appears in site contents
- [ ] Web part loads without errors
- [ ] Navigation menu displays correctly
- [ ] Features load based on configuration
- [ ] Permissions enforce correctly
- [ ] Mock data displays properly
- [ ] Performance is acceptable
- [ ] No console errors

Run verification script:

```powershell
$siteUrl = "https://<tenant>.sharepoint.com/sites/targetsite"
Connect-PnPOnline -Url $siteUrl

# Check app installation
$app = Get-PnPApp | Where-Object { $_.Title -eq "iDS Hub" }
if ($app) {
    Write-Host "✓ App installed successfully"
    Write-Host "App ID: $($app.Id)"
} else {
    Write-Host "✗ App not found"
}

# Check lists exist (if applicable)
$lists = Get-PnPList
$lists | ForEach-Object { Write-Host "- $($_.Title)" }
```

## Updating the Application

### Minor Updates (Bug Fixes, Small Features)

```bash
# Update version in package.json
# "version": "1.0.1"

# Build and package
npm run build
npm run package:prod

# Upload to App Catalog (overwrite existing)
# Same as initial deployment, but select existing file
```

### Major Updates (Significant Changes)

1. Update `version` in `package.json`
2. Update `solution/manifest.json` with new version
3. Create new package
4. Upload to App Catalog as new version
5. Test in staging environment first
6. Deploy to production sites
7. Update documentation

### Retract and Redeploy

```powershell
# Retract app from all sites
$app = Get-PnPApp | Where-Object { $_.Title -eq "iDS Hub" }
Uninstall-PnPApp -Identity $app.Id -Scope Tenant

# Remove from App Catalog
Remove-PnPFile -ServerRelativeUrl "/sites/appcatalog/AppCatalog/ids-hub.sppkg"

# Re-upload and deploy
```

## Environment-Specific Configuration

### Development

```json
{
  "environment": "development",
  "apiEndpoint": "http://localhost:3000",
  "dataSource": "mock",
  "logLevel": "debug"
}
```

### Staging

```json
{
  "environment": "staging",
  "apiEndpoint": "https://staging-api.example.com",
  "dataSource": "sharepoint",
  "logLevel": "warn"
}
```

### Production

```json
{
  "environment": "production",
  "apiEndpoint": "https://api.example.com",
  "dataSource": "sharepoint",
  "logLevel": "error"
}
```

## Monitoring & Support

### Monitor App Usage

```powershell
# Get app telemetry
Get-PnPApp | Where-Object { $_.Title -eq "iDS Hub" } | Select-Object *
```

### Check Error Logs

1. Navigate to site
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Check for errors or warnings

### Performance Monitoring

- Use browser DevTools **Performance** tab
- Monitor network requests
- Check component load times
- Verify bundle size in production

### User Support

- Provide link to documentation
- Include support email/contact
- Document common issues and solutions

## Troubleshooting

### App Won't Deploy

**Error**: "App cannot be deployed"

**Solution**:
1. Verify App Catalog exists
2. Check you have proper permissions
3. Try removing and re-uploading package
4. Check package for errors: `npm run build && npm run package:prod`

### Web Part Not Loading

**Error**: "The web part could not be loaded"

**Solution**:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check browser console for errors
4. Verify web part manifest is valid
5. Check SharePoint version compatibility

### Lists Not Found

**Error**: "Required lists not found"

**Solution**:
1. Run provisioning template
2. Verify list names match configuration
3. Check user has list access permissions
4. Verify lists created in correct site collection

### Performance Issues

**Slow loading or unresponsive**:
1. Check network tab for large bundles
2. Verify data source performance
3. Enable code caching
4. Consider lazy loading features
5. Review React component rendering

## Rollback Procedure

If critical issue found:

```powershell
# Uninstall from all sites
$app = Get-PnPApp | Where-Object { $_.Title -eq "iDS Hub" }
Uninstall-PnPApp -Identity $app.Id -Scope Tenant

# Wait for uninstall to complete
Start-Sleep -Seconds 30

# Remove from App Catalog
Remove-PnPFile -ServerRelativeUrl "/sites/appcatalog/AppCatalog/ids-hub.sppkg"

# Restore previous version if needed
```

## Release Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Code review completed
- [ ] Build succeeds without warnings
- [ ] Package created successfully
- [ ] Tested in staging environment
- [ ] Documentation updated
- [ ] Release notes prepared
- [ ] Rollback plan documented
- [ ] Stakeholders notified
- [ ] Support team briefed

---

For local development setup, see [Local Development Guide](./local-development.md).
