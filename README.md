![docs/images/homepage-screenshot.png](docs/images/homepage-screenshot.png)

# Student Club Web

Student Club Web is an open-source website template that enables student clubs to easily create and manage their digital presence. Although it was initially developed for the Istanbul University Computer Science Club (IU CSC), the project is designed to be flexible and customizable, making it suitable for all university clubs. The platform aims to encourage student participation in club activities, provide an efficient way to share announcements, and enhance the club's digital identity with a modern solution.

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
- Admin Panel

## Technologies Used

- **Next.js:** A powerful React framework for building static and server-rendered applications. Next.js optimizes performance, provides automatic code splitting, and enhances SEO, making it the ideal choice for building a fast, scalable website.

- **React:** A JavaScript library for building user interfaces. React allows the creation of reusable UI components, ensuring that the frontend of the site is dynamic, responsive, and efficient.

- **TypeScript:** A statically typed superset of JavaScript, TypeScript enhances the development process by adding type safety to the project. This improves code quality and reduces the likelihood of runtime errors.

- **Tailwind CSS** CSS: A utility-first CSS framework that allows rapid UI development by using pre-defined classes. Tailwind CSS helps maintain a consistent design throughout the website and significantly reduces the amount of custom CSS code needed.

- **Go Fiber:** A fast and lightweight web framework for building backend services with Go (Golang). Go Fiber is designed to be simple and highly performant, providing a minimalistic API that allows quick routing and efficient handling of HTTP requests. It is especially well-suited for building RESTful APIs and high-performance web applications.

- **MongoDB:** A flexible and scalable NoSQL database. MongoDB stores data in JSON-like documents and is often used in projects requiring high read/write performance, especially for large datasets.

- **pnpm:** A fast, disk space-efficient package manager for JavaScript. pnpm ensures faster installation times and better dependency management compared to npm, and it optimizes disk usage by storing dependencies in a global store.

- **Docker:** A platform for developing, shipping, and running applications in containers. Docker ensures the application runs consistently across different environments, making it easier to deploy and scale the application.

- **Traefik:** A modern reverse proxy and load balancer. Traefik is used to manage microservices and route traffic between different services. With automatic configuration and dynamic routing features, it makes it easy to manage traffic between services within your application.


## Getting Started

Firstly, rename the `default.env` file to `.env` and fill in the variables according to your setup.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

#### Using Docker

To start with Docker, use:

```bash
docker compose up --build
```

#### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/enesbuyuk/student-club-web.git
```

2. Navigate to the project directory:
```bash
cd student-club-web
```

3. Install the dependencies:
```bash
pnpm install
```

### Development Server

Run the development server with one of these commands:

```bash
pnpm dev
```

### Production Deployment

#### Building the Project

Build the project with one of these commands:

```bash
pnpm build
```

#### Starting the Production Server

Start the production server with one of these commands:

```bash
pnpm start
```

## Demo

Visit the live demo at [iucs.net](https://iucs.net/)

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under GPL-3.0 License. See the [LICENSE](https://github.com/enesbuyuk/university-student-club-website?tab=GPL-3.0-1-ov-file) file for details.
