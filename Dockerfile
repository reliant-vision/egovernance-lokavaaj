# Stage 1: Build React app
FROM node:20.11.1 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Build Python environment
FROM python:3.12.2 as python
WORKDIR /app/backend
RUN apt-get update && \
    apt-get install -y python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Stage 3: Final image with Nginx and Flask app
FROM nginx:1.21

# Copy static files from the React build
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy Flask app code
COPY backend /app/backend

# Expose ports
EXPOSE 80
EXPOSE 5000

# Start Gunicorn to run Flask app and then Nginx
CMD ["gunicorn", "backend.run:app", "--bind", "0.0.0.0:5000", "&", "nginx", "-g", "daemon off;"]
