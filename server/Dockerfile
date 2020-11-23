FROM node:14

# Create app directory
WORKDIR /app
ADD . /app/

# global install & update
RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

# start command
CMD [ "yarn", "start" ]