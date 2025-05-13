#using mulit stage dockerization

#stage two BUild the server side
FROM node:18 AS backend-build

WORKDIR /app
COPY server/package*json ./
RUN npm install
COPY server ./


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY client/dist /usr/share/nginx/html

COPY --from=backend-build /app /app

WORKDIR /app/server
RUN apk add --no-cache nodejs npm 

EXPOSE 80

CMD sh -c "npm start & nginx -g 'daemon off;'"