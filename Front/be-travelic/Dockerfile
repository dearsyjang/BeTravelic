FROM node:16.15.0 as build-stage
# FROM node:lts-alpine3.15
WORKDIR /var/jenkins_home/workspace/BeTravelic/Front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/BeTravelic/Front/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/BeTravelic/Front/be-travelic/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# CMD ["nginx", "-g","daemon off;"]
CMD npm start
