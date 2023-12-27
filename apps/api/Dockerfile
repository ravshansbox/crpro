FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json schema.prisma tsconfig.json ./

FROM base AS dev
RUN npm install
COPY . ./
RUN npm run build

FROM base AS prod
RUN npm install --omit=dev

FROM base
COPY --from=dev /app/dist ./
COPY --from=prod /app/node_modules ./node_modules
CMD npm run prisma:db:push && node ./src
