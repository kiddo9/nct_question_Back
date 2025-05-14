# Stage 1: Build React App
FROM node:18 AS frontend-build

WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

# Stage 2: Build Node.js Backend
FROM node:18 AS backend-build

WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server ./

# Stage 3: NGINX + Backend
FROM nginx:alpine

# Copy NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build
COPY --from=frontend-build /app/client/dist /usr/share/nginx/html

# Copy backend files
COPY --from=backend-build /app /app

# Set working dir
WORKDIR /app/server

# Install Node.js to run backend
RUN apk add --no-cache nodejs npm

EXPOSE 80

CMD sh -c "npm start & nginx -g 'daemon off;'"
