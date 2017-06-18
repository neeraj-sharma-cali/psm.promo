FROM node:7.10.0

EXPOSE 3000
ENV NODE_ENV production
RUN mkdir /app
WORKDIR /app

RUN npm install

# add the rest of the files
ADD . /app

CMD ["node", "server/boot.js"]