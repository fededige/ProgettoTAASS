FROM node:lts
WORKDIR /usr/app
COPY package*.json .
RUN npm install -g @angular/cli
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . ./
CMD ["ng", "serve", "--host=0.0.0.0"]
