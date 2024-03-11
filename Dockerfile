FROM node:20.11.1-bookworm-slim as prod

COPY ./docker-healthcheck /usr/local/bin/
WORKDIR /home/node/app

# Updates NPM
RUN npm install -g npm@10.5.0

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .

HEALTHCHECK CMD ["docker-healthcheck"]

EXPOSE 3000
CMD [ "node", "server.js" ]


FROM prod as dev
ENV NODE_ENV=development
RUN npm install


FROM dev as test
ENV NODE_ENV=development
CMD ["npm", "test"]
