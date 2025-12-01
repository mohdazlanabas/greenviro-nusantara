# A2 Hosting - Managed Websites

This folder contains files and configuration for two websites hosted on A2 Hosting under the `ptgvnsit` account.

## 🌐 Hosted Websites

### 1. **Greenviro Nusantara** (Main Site)
- **URL:** https://greenviro-nusantara.com
- **Server Path:** `/home/ptgvnsit/public_html/`
- **Description:** "Under Construction" placeholder page with green/eco theme
- **Features:**
  - Animated progress bar
  - Visitor location detection (IP-based geolocation)
  - Live clock showing visitor's local time
  - Interactive leaf animations
  - Time-based greetings

### 2. **PTGVN Site** (Gaida Bali Retreats)
- **URL:** https://ptgvn.site
- **Server Path:** `/home/ptgvnsit/ptgvn.site/public_html/`
- **Description:** E-commerce site for Bali spa retreat packages
- **Features:**
  - Database-driven spa package listings
  - Shopping cart functionality
  - Stripe payment integration
  - PHP-based application

## 📁 Local Folder Structure

```
ptgvn_site/
├── README.md                    # This file
├── references/                  # Server credentials and configuration
│   ├── .env                    # Environment variables (DB, Stripe keys)
│   ├── database_info.md        # Database names and credentials
│   └── login.md                # cPanel and SSH access information
├── site_placeholder/            # Greenviro Nusantara site files
│   ├── index.html              # Main HTML file
│   └── src/
│       ├── scripts.js          # JavaScript (location, time, animations)
│       └── styles.css          # CSS styling
└── sftp/                        # Screenshots and temporary files
    ├── image01.png             # File manager screenshot
    └── image02.png             # public_html contents screenshot
```

## 🔐 Server Access

### cPanel Access
- **URL:** https://s12017.sgp1.stableserver.net:2083/
- **Username:** `ptgvnsit`
- **Password:** See `references/login.md`

### SSH Access
```bash
ssh ptgvnsit@s12017.sgp1.stableserver.net
```
- **Password:** See `references/login.md`

### SFTP/FTP Access
- **Host:** `s12017.sgp1.stableserver.net`
- **Port:** 22 (SFTP) or 21 (FTP)
- **Username:** `ptgvnsit`

## 🗄️ Database Information

### Primary Database
- **Name:** `ptgvnsit_stripe.balispaguide`
- **Username:** `ptgvnsit_baliuser`
- **Password:** See `references/database_info.md`
- **Tables:** `spas`, `bookings`, `booking_items`, `stripe_events`

### Alternative Database
- **Name:** `ptgvnsit_balispaguide`

**Location:** Configuration stored in `/home/ptgvnsit/ptgvn.site/secret/.env`

## 🏗️ Server Directory Structure

```
/home/ptgvnsit/
├── public_html/                    # Greenviro Nusantara (main domain)
│   ├── index.html                 # Under construction page
│   ├── .htaccess                  # Drupal rewrite rules
│   └── src/
│       ├── scripts.js
│       └── styles.css
│
└── ptgvn.site/                     # PTGVN Site (addon domain)
    ├── .htaccess                  # Rewrite rules for public_html redirect
    ├── index.php                  # Main entry point (redirects to public_html)
    ├── bootstrap.php              # Application bootstrap
    ├── composer.json              # PHP dependencies
    ├── assets -> public_html/assets        # Symlink
    ├── commerce -> public_html/commerce    # Symlink
    ├── partials -> public_html/partials    # Symlink
    ├── secret/
    │   └── .env                   # Database and API credentials
    ├── src/
    │   └── Models/
    │       └── SpaRepository.php  # Database queries for spas
    ├── vendor/                    # Composer dependencies
    └── public_html/               # Actual website root
        ├── index.php              # Main page
        ├── assets/
        │   ├── css/
        │   └── images/
        ├── commerce/
        │   ├── cart.php
        │   └── stripe.php
        └── partials/
            ├── header.php
            └── footer.php
```

## 🔧 Important Technical Notes

### Domain Configuration Issue (RESOLVED)
The `ptgvn.site` domain was initially configured with document root as `/home/ptgvnsit/ptgvn.site/` instead of `/home/ptgvnsit/ptgvn.site/public_html/`.

**Solution Implemented:**
1. Created redirect `index.php` at root level to load from `public_html/`
2. Created symlinks for `assets/`, `commerce/`, and `partials/` directories
3. This allows static files (images, CSS, JS) to be accessible without changing cPanel configuration

### Database Configuration Fix
Original `.env` had incorrect database name:
- **Wrong:** `ptgvnsit_stripe_gaida`
- **Correct:** `ptgvnsit_stripe.balispaguide`

### File Path Issues (Greenviro Nusantara)
The HTML references `src/styles.css` and `src/scripts.js` which is correct as there is a `src/` directory in the public_html folder.

## 🚀 Deployment Instructions

### To Update Greenviro Nusantara:
```bash
# Upload files to public_html
scp site_placeholder/index.html ptgvnsit@s12017.sgp1.stableserver.net:public_html/
scp site_placeholder/src/scripts.js ptgvnsit@s12017.sgp1.stableserver.net:public_html/src/
scp site_placeholder/src/styles.css ptgvnsit@s12017.sgp1.stableserver.net:public_html/src/
```

### To Update PTGVN Site:
```bash
# Upload to ptgvn.site/public_html
scp [files] ptgvnsit@s12017.sgp1.stableserver.net:ptgvn.site/public_html/
```

## 🔑 API Keys & Credentials

### Stripe Integration (PTGVN Site)
- **Public Key:** `pk_live_51KE3yR...` (see `.env`)
- **Secret Key:** `sk_live_51KE3yR...` (see `.env`)
- **Mode:** Live mode
- **Location:** `/home/ptgvnsit/ptgvn.site/secret/.env`

## 📝 Notes

- Both sites are on the same A2 Hosting account but in separate directories
- Greenviro Nusantara is the primary domain (main site)
- PTGVN Site is configured as an addon domain
- DO NOT disturb files in `/home/ptgvnsit/public_html/` when working on ptgvn.site
- Always backup files before making changes
- Database credentials are stored separately from code for security

## 🐛 Troubleshooting

### Images not showing on PTGVN Site
Check that symlinks exist in `/home/ptgvnsit/ptgvn.site/`:
```bash
ls -la ptgvn.site/ | grep assets
ls -la ptgvn.site/ | grep commerce
```

### Database connection errors
Verify `.env` file has correct database name:
```bash
cat ptgvn.site/secret/.env | grep DB_DATABASE
```

### 404 errors
Check document root configuration in cPanel or verify symlinks and redirect files are in place.

## 📧 Support

For hosting support: Contact A2 Hosting support
For development: Check the error logs at `/home/ptgvnsit/ptgvn.site/public_html/error_log`

---

**Last Updated:** November 30, 2025
**Hosting Provider:** A2 Hosting
**Server Location:** Singapore (s12017.sgp1.stableserver.net)
