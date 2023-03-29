# Building a Fullstack Netflix Clone with React, NextJS, TailwindCSS & Prisma
![image](https://user-images.githubusercontent.com/72767265/228677696-59af075f-8fa1-4cce-8206-4453c74978ef.png)

## Features
- Environment, NextJS Setup
- MongoDB & Prisma connect, Database creation
- Authentication with NextAuth, Google & Github Login
- Full responsiveness on all pages
- Detail-oriented effects and animations using TailwindCSS
- React SWR data fetching
- Zustand state management

## Prerequisites
Node v14.17.0 or higher

## Installation
1. Clone the repo
   ```sh
   git clone git@github.com:jcodev2/netflix-clone.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create a .env.local file in the root directory and add the following
    ```sh
    DATABASE_URL=

    NEXTAUTH_JWT_SECRET=
    NEXTAUTH_SECRET=

    GITHUB_ID=
    GITHUB_SECRET=

    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    ```
4. Run the development server
    ```sh
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License
Distributed under the MIT License. See `LICENSE` for more information.
