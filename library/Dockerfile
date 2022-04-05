FROM node:14.15.3

WORKDIR /library

COPY ./package*.json ./

RUN npm install

COPY middleware/ ./middleware
COPY models/ ./models
COPY public/ ./public
COPY routes/ ./routes
COPY views/ ./views
COPY ./index*.js ./
COPY ./*.env ./

EXPOSE 3000

CMD [ "npm", "run", "start"]
