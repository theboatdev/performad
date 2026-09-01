## Running the Project with Docker

This project is containerized using Docker and Docker Compose for easy setup and deployment. Below are the instructions and requirements specific to this project:

### Project-Specific Docker Requirements
- **Node.js Version:** Uses Node.js `22.13.1-slim` (as specified in the Dockerfile).
- **Build Process:** Utilizes a multi-stage build to optimize image size and security.
- **Production User:** Runs as a non-root user (`appuser`) for improved security.

### Environment Variables
- No required environment variables are specified in the Dockerfile or docker-compose.yml by default.
- If you need to set environment variables, you can create a `.env` file and uncomment the `env_file` line in `docker-compose.yml`.

### Build and Run Instructions
1. **Build and Start the Application:**
   ```sh
   docker compose up --build
   ```
   This will build the Docker image and start the Next.js application.

2. **Access the Application:**
   - The app will be available at [http://localhost:3000](http://localhost:3000).

### Ports
- **3000:** The Next.js application is exposed on port `3000` (as defined in `docker-compose.yml`).

### Special Configuration
- No external services or persistent volumes are required for this project.
- All dependencies are installed using `npm ci` for deterministic builds.
- The build process removes development dependencies for a smaller production image.

---
*For further customization, such as adding environment variables or external services, update the `docker-compose.yml` accordingly.*
