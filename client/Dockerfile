FROM node:14
WORKDIR /app
RUN echo "Copying files...."
COPY . .
WORKDIR /app/client/
RUN npm install
RUN npm run build:ssr
EXPOSE 4000
CMD npm run serve:ssr
