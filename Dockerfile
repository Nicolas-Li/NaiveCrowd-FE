# build stage
FROM node:12.18.2
RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ .
RUN npm run build

# production stage
FROM nginx:1.18.0

RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx/ /etc/nginx/

#RUN rm -r /etc/nginx/conf.d \
# && ln -s $HOME/nginx /etc/nginx/conf.d
#
#RUN ln -sf /dev/stdout /var/log/nginx/access.log \
# && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
