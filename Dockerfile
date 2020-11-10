FROM cypress/base

WORKDIR /.

COPY . .

RUN yarn add prom-client
CMD [ "npx", "cypress", "run" ]