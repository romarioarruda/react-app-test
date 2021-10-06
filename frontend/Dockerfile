FROM node:14-alpine

WORKDIR /react-app/frontend

COPY package.json yarn.lock ./

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]