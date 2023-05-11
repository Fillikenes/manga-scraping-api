FROM node:16-alpine AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --ignore-scripts -g npm@latest
RUN npm install --ignore-scripts

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY ./ /app
RUN npm test
RUN npm run build

FROM node:16-alpine AS prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --ignore-scripts -g npm@latest
RUN npm install --omit=dev --omit=optional --ignore-scripts

FROM node:16-alpine AS prod
WORKDIR /app
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER nonroot
EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]
