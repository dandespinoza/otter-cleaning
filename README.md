# Otter Cleaning

Professional house cleaning services platform serving NYC, Long Island, and New Jersey.

## Features

- **Online Booking**: Book cleaning services in 60 seconds
- **Four Service Tiers**: Standard, Standard Plus, Deep Clean, Move In/Out
- **Residential & Commercial**: Services for homes and businesses
- **Real-Time Pricing**: Transparent pricing with instant quotes
- **SEO Optimized**: Full meta tags, structured data, sitemap

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **State**: TanStack React Query

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/dandespinoza/otter-cleaning.git
cd otter-cleaning

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
# or
bun run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
bun run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # shadcn/ui components
│   └── ...        # Custom components
├── pages/         # Page components
├── assets/        # Images and static files
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── App.tsx        # Main app with routing
├── main.tsx       # Entry point
└── index.css      # Global styles

public/
├── robots.txt     # Search engine directives
├── sitemap.xml    # XML sitemap
└── ...           # Static assets
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/services` | Service tiers and pricing |
| `/booking` | Online booking form |
| `/commercial` | Commercial cleaning services |
| `/how-it-works` | Process explanation |
| `/about` | Company information |
| `/blog` | Blog listing page |
| `/blog/:slug` | Individual blog posts |
| `/faq` | Frequently asked questions |
| `/checklist` | Cleaning checklist |
| `/contact` | Contact form |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/admin` | Admin dashboard (CMS) |

## SEO Features

- Dynamic meta tags with react-helmet-async
- Structured data (LocalBusiness, Service, FAQPage schemas)
- XML sitemap at `/sitemap.xml`
- Robots.txt with sitemap reference
- Open Graph and Twitter Card meta tags
- Canonical URLs

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_SITE_URL=https://ottercleaning.com
VITE_API_URL=https://api.ottercleaning.com
```

## License

Copyright 2026 Otter Cleaning. All rights reserved.

## Contact

- Website: https://ottercleaning.com
- Email: hello@ottercleaning.com
- Phone: (929) 274-1177
- Service Areas: NYC, Long Island, New Jersey
