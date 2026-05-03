# Iron Fuel Lab - Shopify Native Theme

This repository contains the official, build-free Shopify theme for Iron Fuel Lab. It has been converted from a React prototype into a native Liquid/CSS/JS stack for maximum performance and maintainability.

## Project Structure

- `assets/`: Contains `theme.css`, `theme.js`, and all brand images.
- `layout/`: Contains `theme.liquid` (the primary wrapper).
- `sections/`: Modular Liquid sections (Hero, Products, Cart Drawer, etc.).
- `templates/`: JSON templates defining page layouts.
- `.shopify-cli-env/`: A portable Node.js environment for running Shopify CLI tools.

## Development

You can run Shopify CLI commands using the helper scripts provided in the root directory. No system-wide Node.js installation is required.

### Previewing the Theme

To start a local development server:
```cmd
shopify theme dev
```

### Pushing Changes

To push your changes to your Shopify store:
```cmd
shopify theme push
```

### Logging In

To log in to your Shopify partner account:
```cmd
shopify login
```

---
*Note: In PowerShell, use `.\shopify.cmd <command>` to run these tools.*
