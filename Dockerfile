FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i
CMD [ "node","index.js" ]
EXPOSE 4000