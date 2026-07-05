<p align="center">
  <a href="https://reicon.dev">
    <img src="https://raw.githubusercontent.com/dqev/reicon/main/public/readme-banner.png" alt="Reicon — Free Open-Source Icon Library" width="100%" />
  </a>
</p>

# 📁 Public Directory

This folder holds all public static assets served by Vite directly at the root URL (e.g. `https://reicon.dev/favicon.ico`).

## 🗂️ What's Inside

### 🌐 SEO & Crawler Files
* [`sitemap.xml`](file:///Users/devchauhan/Documents/Website/reicon/public/sitemap.xml): The primary sitemap linking to sub-sitemaps.
* [`sitemap-pages.xml`](file:///Users/devchauhan/Documents/Website/reicon/public/sitemap-pages.xml): Sitemap entries for standard routes (Landing, FAQ, Packages, etc.).
* `sitemap-icons-*.xml`: Multi-part sitemaps containing pages for every individual icon. Generated dynamically during the build step.
* [`robots.txt`](file:///Users/devchauhan/Documents/Website/reicon/public/robots.txt): Configured to guide search crawlers correctly, pointing to the sitemaps.

### 🖼️ Branding & Visuals
* `favicon.ico` / `favicon.svg` / `favicon-*.png`: Multi-resolution favicon files for browsers and bookmark bars.
* `og-image.png`: High-resolution Open Graph image served when the website URL is shared on social platforms.
* `reicon.png` / `icon-*.webp`: Main logo variants used across documentation and readmes.

### 📦 Downloads & Utilities
* [`reicon-icons.zip`](file:///Users/devchauhan/Documents/Website/reicon/public/reicon-icons.zip): Compressed ZIP package containing all raw SVG files (`outline` and `filled` folders) for developers and designers to download.
* [`cheatsheet.html`](file:///Users/devchauhan/Documents/Website/reicon/public/cheatsheet.html): Interactive list of all icons with instant copy options.

### 🤖 LLM & Context Files
* [`llms.txt`](file:///Users/devchauhan/Documents/Website/reicon/public/llms.txt): A structured text file optimized for LLMs (like Cursor, Gemini, Copilot) to quickly understand how to write and install Reicon.
* [`llms-full.txt`](file:///Users/devchauhan/Documents/Website/reicon/public/llms-full.txt): Deep structural context of the Reicon codebase for advanced AI-driven programming queries.
