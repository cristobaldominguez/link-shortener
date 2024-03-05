FROM node:20.11.1-bookworm-slim

ARG node_env
ENV NODE_ENV=${node_env:-development}

COPY ./docker-healthcheck /usr/local/bin/

WORKDIR /home/node/app
# RUN mkdir -p ./node_modules && chown -R node:node .

COPY package*.json ./
# RUN npm install && npm cache clean --force
COPY . .
RUN npm install

HEALTHCHECK CMD ["docker-healthcheck"]

EXPOSE 3000
CMD [ "node", "server.js" ]