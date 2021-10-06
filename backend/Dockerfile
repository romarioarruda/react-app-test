FROM node:14-alpine

WORKDIR /react-app/backend
COPY package.json yarn.lock ./

COPY . .

EXPOSE 3001
CMD ["yarn", "start"]