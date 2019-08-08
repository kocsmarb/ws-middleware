FROM node:11.15 AS mynode

WORKDIR /usr/app

COPY . .

EXPOSE 4000

ENV DB_HOST=localhost
ENV DB_PORT=5433
ENV DB_USER=developer
ENV DB_PASSWORD=developer
ENV DB_DATABASE=developer
ENV JWT_PRIVATE_KEY=my-secret-jwt-key
ENV JWT_EXPIRES_IN=3d
ENV HASH_GEN_SALT=my-secret-hash-gen-salt

RUN npm install
RUN npm run build
CMD npm run start