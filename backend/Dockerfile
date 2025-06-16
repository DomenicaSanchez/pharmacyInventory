# 1. Build step
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json prisma ./
RUN npm install

COPY . .

RUN npx prisma generate   
RUN npm run build

# 2. Production image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./ 
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma  

ENV NODE_ENV=production
ENV DATABASE_URL=""

EXPOSE 3000

CMD ["node", "dist/server.js"]
