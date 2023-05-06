FROM node:16-alpine AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm test
RUN npm run build

FROM node:16-alpine AS prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --production --no-optional

FROM node:16-alpine AS prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
RUN ls -la

CMD [ "node", "dist/src/main.js" ]