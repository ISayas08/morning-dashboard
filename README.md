# This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- Node.js 20.19.1
- pnpm@pnpm@10.2.0

## Getting Started

This project uses [pnpm](https://pnpm.io/) as its package manager, managed via [Corepack](https://nodejs.org/api/corepack.html).

1. Enable Corepack (if not already enabled):
   ```sh
   corepack enable
   ```
2. Install dependencies using pnpm (Corepack will automatically use the version specified in `package.json` and `.npmrc`):
   ```sh
   pnpm install
   ```
3. Start the project by running
   ```sh
   pnpm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Vercel URL
 You can see this app deployed at https://morning-dashboard-pi.vercel.app/

## API Routes Description

- `/api/current-weather` — Returns current weather data for a given latitude, longitude, and optional timezone. Requires `lat` and `lon` query parameters. Responds with weather info or error status.

- `/api/landmark-photo` — Returns a random landmark photo for a given city. Requires `cityName` query parameter. Responds with photo data or error status.

- `/api/location` — Returns geolocation data based on an IP address. Requires `ip` query parameter. Handles private IPs and responds with location info or error status.

- `/api/quote` — Returns a random inspirational quote. No parameters required. Responds with quote data or error status.

## Screenshots
<img width="1600" height="1119" alt="image" src="https://github.com/user-attachments/assets/81c8661d-3a87-4419-ab32-b3ffe226e52c" />
<img width="1600" height="1120" alt="image" src="https://github.com/user-attachments/assets/cd30dc25-0ce2-4bc4-8d7d-ae20c3a8e32d" />
<img width="1600" height="1059" alt="image" src="https://github.com/user-attachments/assets/5401645f-f3aa-4157-a8ca-c70fa4c23984" />



---
