FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN chmod -R a+x node_modules
RUN npm run build
CMD ["npm", "start"]