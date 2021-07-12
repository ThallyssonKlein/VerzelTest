FROM node:14.16.1-alpine3.13

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN cd frontendProject/ && yarn && yarn build

EXPOSE 3000

CMD cd frontendProject/ && yarn start