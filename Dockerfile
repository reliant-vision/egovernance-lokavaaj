# Stage 1: Node Build Stage
FROM node:20.11.1 as build
WORKDIR /app
COPY . .
COPY backend/requirements.txt .

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

# Install Gunicorn separately
RUN pip install gunicorn

# Stage 3: Nginx Stage
FROM nginx:1.21
COPY --from=build /app/build /usr/share/nginx/html/
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80
EXPOSE 5000

# Set Flask app environment variable
ENV FLASK_APP=run.py

# Start Gunicorn
CMD ["/usr/local/bin/gunicorn", "-b", "0.0.0.0:5000", "run:app"]
