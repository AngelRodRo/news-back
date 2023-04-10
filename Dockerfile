ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

COPY package.json yarn.lock tsconfig.json tsconfig.compile.json .barrelsby.json ./

RUN yarn install --pure-lockfile

COPY ./src ./src
COPY ./scripts ./scripts

RUN yarn build

FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

RUN apk update && apk add build-base git curl
RUN npm install -g pm2

COPY --from=build /opt .

RUN yarn install --pure-lockfile --production

COPY ./views ./views
COPY processes.config.js .

EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
ENV DB_DEFAULT_URL mongodb://mongodb:27017/newsdb

CMD ["yarn", "start:prod"]
