# Stage 1: Build Stage
FROM node:20.11.1 as build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Stage 2: Python Dependencies Stage
FROM python:3.12.2
WORKDIR /app

# Install pip
RUN apt-get update && \
    apt-get install -y python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Install Gunicorn
RUN pip install gunicorn

# Add Python binaries directory to the PATH
ENV PATH="/usr/local/bin:${PATH}"

# Stage 3: Production Stage
FROM nginx:1.21
WORKDIR /usr/share/nginx/html

# Copy static files from the build stage
COPY --from=build /app/build .

# Copy Nginx configuration
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
EXPOSE 5000

# Set environment variable
ENV FLASK_APP=run.py

# Start Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "run:app"]
