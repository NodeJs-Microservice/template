FROM node:18.20.3 AS builder
LABEL stage=intermediate
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
RUN rm -rf ./node_modules
RUN yarn install --production

# copy built application to runtime image
FROM node:18.20.3-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV production
ENTRYPOINT [ "node", "dist/app.js" ]
