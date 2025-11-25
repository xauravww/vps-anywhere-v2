# VPS Anywhere

A web-based terminal emulator that runs in a Docker container, designed for Render.com.

## Features

- **Web Terminal**: Full access to the container's shell via `xterm.js`.
- **Authentication**: Simple password protection.
- **Dockerized**: Easy to deploy.

## Running with Docker

### 1. Build the Image

```bash
docker build -t vps-anywhere .
```

### 2. Run the Container

Run the container mapping port 3000. You can set a custom password using the `PASSWORD` environment variable (default is `admin`).

```bash
docker run -p 3000:3000 -e PASSWORD=mysecretpassword vps-anywhere
```

### 3. Access the App

Open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

Login with the password you set (or `admin`).

## Development

To run locally without Docker:

```bash
npm install
npm run dev
```

Note: `npm run dev` starts the custom Node.js server (`server.js`) which is required for the WebSocket terminal to work.
