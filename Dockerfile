FROM node:20.11.1 as build
WORKDIR /app
COPY . .
COPY backend/requirements.txt .

RUN npm install
RUN npm run build

FROM python:3.12.2
WORKDIR /app
RUN pip install -r requirements.txt
COPY --from=build /app/build /usr/share/nginx/html/
#prod environment 


FROM nginx:1.21
# COPY --from=build /app/build /usr/share/nginx/html/
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN pip install gunicorn

EXPOSE 80
EXPOSE 5000

ENV FLASK_APP=run.py

# CMD ["nginx","-g", "daemon off;","&&", "flask", "run", "--host=0.0.0.0", "--port=5000"]
# CMD /bin/bash -c "nginx -g 'daemon off;' && flask run --host=0.0.0.0 --port=5000"
# CMD service nginx start && gunicorn -b 0.0.0.0:5000 run:app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "run:app"]




