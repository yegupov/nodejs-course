FROM node:14.15.3

WORKDIR /counter

COPY ./package*.json ./

RUN npm install

COPY routes/ ./routes
COPY ./index*.js ./
COPY ./book-views*.json ./

EXPOSE 3002

CMD [ "npm", "run", "start"]
