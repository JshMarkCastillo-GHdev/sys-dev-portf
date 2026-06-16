# Troubleshooting Guide

Common issues and solutions for the portfolio project.

## Runtime fetch fails with certificate/SSL errors (GitHub API, etc.)

### Symptom

```
Failed to fetch GitHub profile [TypeError: fetch failed] {
  [cause]: Error: unable to verify the first certificate
  code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
}
```

### Cause

Same as npm issue—antivirus SSL interception. The `.npmrc` fix only helps npm, not Node.js runtime.

### Fix

`next build` cannot use `NODE_OPTIONS=--use-system-ca` (Next.js worker restriction). For local **dev** fetch issues, set the env var manually before starting the server:

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
npm run dev
```

`.npmrc` still applies `node-options=--use-system-ca` for npm installs.

### Manual Fix (if scripts don't work)

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
npm run dev
```

---

## npm install fails with certificate/SSL errors

### Symptom

```
npm error unable to verify the first certificate
npm error UNABLE_TO_VERIFY_LEAF_SIGNATURE
npm error Exit handler never called!
```

### Cause

Antivirus software (Norton, McAfee, Kaspersky, Bitdefender, Windows Defender) intercepts HTTPS traffic and replaces certificates with their own. Node.js doesn't trust these by default.

### Solutions (try in order)

#### 1. Use the project's .npmrc (Automatic)

The project includes a `.npmrc` file that tells npm to use the system's certificate store:

```ini
use-system-ca=true
```

This should work automatically for most users.

#### 2. Set Environment Variable (Per-Session)

If `.npmrc` doesn't work, set this before running npm commands:

**Windows PowerShell:**

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
npm install
```

**Windows Command Prompt:**

```cmd
set NODE_OPTIONS=--use-system-ca
npm install
```

**macOS/Linux:**

```bash
export NODE_OPTIONS=--use-system-ca
npm install
```

#### 3. Set Environment Variable (Permanent - Windows)

Set it once and forget about it:

```powershell
[Environment]::SetEnvironmentVariable("NODE_OPTIONS", "--use-system-ca", "User")
```

Then restart your terminal.

#### 4. Temporarily Disable Antivirus SSL Scanning

As a last resort, temporarily disable HTTPS scanning in your antivirus:

- **Norton**: Settings → Firewall → Smart Firewall → HTTPS Scanning OFF
- **Windows Defender**: Add `C:\Program Files\nodejs` to exclusions

### Prevention

- Commit the `.npmrc` file to your repo (already done)
- Document the issue in your project's README
- Consider adding a preinstall script that warns users

## Other Common Issues

### Dependencies won't install / Exit handler never called

Clear cache and retry:

```powershell
npm cache clean --force
npm install
```

### Port 3000 already in use

Kill the process or use a different port:

```powershell
npm run dev -- --port 3001
```

### Build fails on Vercel/Render

Check that all environment variables from `.env.example` are set in your deployment dashboard.
