FROM node

ARG USERID=$UID
ARG NPM_TOKEN=$NPM_TOKEN
ENV USERID=$USERID
ENV NPM_TOKEN=$NPM_TOKEN

RUN if ! id -u $USERID > /dev/null 2>&1; then \
        useradd -u $USERID -ms /bin/bash node$USERID; \
    fi

WORKDIR /app

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]