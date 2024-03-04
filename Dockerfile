# Stage 1: Build React app
FROM node:20.11.1 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Build Python environment and Run Flask app with Gunicorn and Nginx
FROM python:3.12.2 as final
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy static files from the React app build
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports for both Flask and Nginx
EXPOSE 5000 80

# Start Gunicorn to run Flask app and Nginx
CMD ["sh", "-c", "gunicorn run:app --bind 0.0.0.0:5000 & nginx -g 'daemon off;'"]
