# News App Backend

## Getting Started

Before running the application, you need to set some environment variables.

Create an .env file in the root of the project with the following variables:

```
DB_DEFAULT_URL=xxxxx
X_RAPIDAPI_KEY=xxxxx
X_RAPIDAPI_HOST=xxxxx
```

Note: `X_RAPIDAPI_KEY` and `X_RAPIDAPI_HOST` has to match with the same variables declared on the .env of the frontend project.

Then you can run the following command:

```
npm install
```

This will install all the necessary dependencies for the project. You can then start the development server by running:

```
npm run start
```

This will start the development server at http://localhost:5173. You can open this URL in your web browser to view the application.

## Building for Production

To build the project for production, run the following command:

```
npm run build
npm run start:prod
```

This will create a build of the project in the build directory and run it.

## Testing

To run the test suite for this project, run the following command:

```
npm test
```

This will run all the test cases in the project and show the test results.

# Dockerfile

If you want to run the application in a Docker container, you can use the following Dockerfile:

## Dockerfile

```
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
```

To build a Docker image using this Dockerfile, navigate to the root of the project and run the following command:

```
docker build -t my-app .
```

## docker-compose

To run the application using docker-compose, first make sure that you have Docker Compose installed. Then, you can run the existing docker-compose.yml file of this project.

```
docker-compose up
```

This will start the application and the MongoDB server in separate Docker containers, and the app will be available on http://localhost:8083.
