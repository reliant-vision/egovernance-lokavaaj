# Stage 1: Build React app
FROM node:20.11.1 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Build Python environment
FROM python:3.12.2 as python
WORKDIR /app/backend
RUN apt-get install -y python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Stage 3: Build Nginx stage
FROM nginx:1.21 as nginx
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Stage 4: Run Flask app with Gunicorn
FROM python 
WORKDIR /app/backend
COPY backend .

# Expose the Flask app port
EXPOSE 5000

# Start Gunicorn to run Flask app
CMD ["gunicorn", "run:app", "--bind", "0.0.0.0:5000"]

# Stage 5: Final image with Nginx and Flask app
FROM nginx

# Copy static files from the Nginx stage
COPY --from=nginx /usr/share/nginx/html /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
