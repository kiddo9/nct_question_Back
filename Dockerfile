#using mulit stage dockerization
#stage one Build the client side
FROM node:18 AS frontend-build

WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

#stage two BUild the server side
FROM node:18 AS backend-build

WORKDIR /app
COPY server/package*json ./server/
RUN cd server && npm install
COPY server ./server


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=frontend-build /app/client/build /usr/share/nginx/html

COPY --from=backend-build /app/server /app/server

WORKDIR /app/server
RUN apk add --no-cache nodejs npm 

EXPOSE 80
EXPOSE 3000

CMD sh -c "node app.js & nginx -g 'daemon off;'"