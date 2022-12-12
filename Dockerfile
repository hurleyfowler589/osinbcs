FROM node:18.12.1 AS builder

# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies
RUN npm ci

RUN npm run build

FROM node:18.12.1-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next

CMD ["npm", "run", "start"]
