FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json package.json
RUN npm install --ignore-scripts -g npm@latest
RUN npm install --ignore-scripts --omit=dev --omit=optional
COPY ./node_modules ./prod_node_modules
RUN npm install --ignore-scripts

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./ /app
RUN npm test
RUN npm run build

FROM node:16-alpine AS prod
EXPOSE 3000
WORKDIR /app
COPY --from=deps /app/prod_node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD [ "node", "dist/src/main.js" ]
