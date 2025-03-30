![docs/images/homepage-screenshot.png](docs/images/homepage-screenshot.png)



# University Student Club Website

This project is the Istanbul University Computer Science Student Club website. It is designed to provide students with information about the club and facilitate participation in club activities.

## Table of Contents

- [Directory Structure](#directory-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Using Docker](#using-docker)
    - [Manual Installation](#manual-installation)
  - [Development Server](#development-server)
  - [Production Deployment](#production-deployment)
    - [Building the Project](#building-the-project)
    - [Starting the Production Server](#starting-the-production-server)
    - [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Directory Structure

```plaintext
Directory structure:
└── enesbuyuk-university-student-club-website/
    ├── README.md
    ├── default.env
    ├── docker-compose.yml
    ├── LICENSE
    ├── backend/
    │   ├── Dockerfile
    │   ├── go.mod
    │   ├── go.sum
    │   ├── main.go
    │   └── pkg/
    │       ├── config/
    │       │   ├── database.go
    │       │   ├── environment.go
    │       │   └── jwt.go
    │       ├── handlers/
    │       │   ├── announcements.go
    │       │   ├── auth.go
    │       │   ├── events.go
    │       │   └── useful_links.go
    │       ├── middleware/
    │       │   └── jwt.go
    │       ├── models/
    │       │   ├── announcement.go
    │       │   ├── event.go
    │       │   ├── useful_links.go
    │       │   └── user.go
    │       ├── routes/
    │       │   ├── announcements.go
    │       │   ├── auth.go
    │       │   ├── events.go
    │       │   └── useful_links.go
    │       ├── server/
    │       │   ├── setup_middleware.go
    │       │   ├── setup_routes.go
    │       │   └── setup_server.go
    │       └── services/
    │           └── hashCompare.go
    └── frontend/
        ├── Dockerfile
        ├── next.config.ts
        ├── package.json
        ├── pnpm-lock.yaml
        ├── pnpm-workspace.yaml
        ├── postcss.config.mjs
        ├── tailwind.config.ts
        ├── tsconfig.json
        ├── .dockerignore
        ├── .eslintrc.json
        ├── db/
        │   └── university-student-club.announcements.json
        ├── messages/
        │   ├── en.json
        │   └── tr.json
        ├── public/
        │   ├── robots.txt
        │   ├── theme/
        │   │   ├── background.webm
        │   │   ├── default-image.webp
        │   │   └── admin/
        │   │       └── admin-login-page.webp
        │   └── uploads/
        │       └── .gitkeep
        └── src/
            ├── middleware.ts
            ├── app/
            │   ├── globals.css
            │   ├── Inter.ttf
            │   ├── layout.tsx
            │   ├── page.tsx
            │   ├── [locale]/
            │   │   ├── layout.tsx
            │   │   ├── not-found.tsx
            │   │   ├── opengraph-image.tsx
            │   │   ├── page.tsx
            │   │   ├── [...rest]/
            │   │   │   └── page.tsx
            │   │   ├── about/
            │   │   │   ├── page.tsx
            │   │   │   ├── charter/
            │   │   │   │   └── page.tsx
            │   │   │   └── team/
            │   │   │       └── page.tsx
            │   │   ├── admin/
            │   │   │   ├── (account)/
            │   │   │   │   ├── sign-in/
            │   │   │   │   │   └── page.tsx
            │   │   │   │   └── sign-out/
            │   │   │   │       └── route.ts
            │   │   │   └── (dashboard)/
            │   │   │       ├── layout.tsx
            │   │   │       ├── page.tsx
            │   │   │       └── announcements/
            │   │   │           ├── page.tsx
            │   │   │           └── [id]/
            │   │   │               ├── edit/
            │   │   │               │   └── page.tsx
            │   │   │               └── remove/
            │   │   │                   └── page.tsx
            │   │   ├── announcements/
            │   │   │   └── page.tsx
            │   │   ├── contact/
            │   │   │   └── page.tsx
            │   │   ├── events/
            │   │   │   └── page.tsx
            │   │   ├── faq/
            │   │   │   └── page.tsx
            │   │   ├── gallery/
            │   │   │   └── page.tsx
            │   │   ├── join-the-club/
            │   │   │   └── page.tsx
            │   │   ├── links/
            │   │   │   └── page.tsx
            │   │   └── useful-links/
            │   │       └── page.tsx
            │   └── fonts/
            │       ├── GeistMonoVF.woff
            │       └── GeistVF.woff
            ├── components/
            │   ├── Faq.tsx
            │   ├── Footer.tsx
            │   ├── Gallery.tsx
            │   ├── Header.tsx
            │   ├── HomeTypewriter.tsx
            │   ├── IndexPageSectionLayout.tsx
            │   ├── LanguageSwitcher.tsx
            │   ├── LastEvents.tsx
            │   ├── MediumArticles.tsx
            │   ├── Navbar.tsx
            │   ├── PageLayout.tsx
            │   └── admin/
            │       └── AdminHeader.tsx
            ├── i18n/
            │   ├── request.ts
            │   └── routing.ts
            ├── lib/
            │   ├── metadata.ts
            │   ├── auth/
            │   │   └── auth.ts
            │   └── utils/
            │       └── user.ts
            └── types/
                ├── Admin.ts
                ├── Announcement.ts
                ├── Attempt.ts
                ├── Event.ts
                ├── Post.ts
                └── User.ts
```


## Features

- Information about the club
- Membership registration
- News and updates
- Announcements
- Medium articles
- Gallery
- Team page
- Contact form

## Technologies Used

- TypeScript
- JavaScript
- React
- Next.js
- Tailwind CSS
- npm
- Docker

## Getting Started

First, rename the `default.env` file to `.env` and fill in the variables according to your setup.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

#### Using Docker

To start with Docker, use:

```bash
docker compose up
```

#### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/enesbuyuk/university-student-club-website.git
```

2. Navigate to the project directory:
```bash
cd university-student-club-website
```

3. Install the dependencies:
```bash
npm install
```

### Development Server

Run the development server with one of these commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Production Deployment

#### Building the Project

Build the project with one of these commands:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

#### Starting the Production Server

Start the production server with one of these commands:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Demo

Visit the live demo at [iucs.net](https://iucs.net/)

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under GPL-3.0 License. See the [LICENSE](https://github.com/enesbuyuk/university-student-club-website?tab=GPL-3.0-1-ov-file) file for details.
