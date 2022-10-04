FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/BeTravelic/Front/be-travelic
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /var/jenkins_home/workspace/BeTravelic/Front/be-travelic/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/BeTravelic/Front/be-travelic/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD npm start --port 3000