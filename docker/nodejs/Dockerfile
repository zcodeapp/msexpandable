FROM node:18

ARG NPM_TOKEN=$NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

RUN apt-get update \
    && apt-get install -y \
        build-essential
RUN npm install -g npm
RUN chown node:node -R /usr/local/lib/node_modules \
    && chown node:node -R /usr/local/bin \
    && npm cache clean -f \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER $USERNAME

WORKDIR /app

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 9229

CMD [ "node" ]