FROM node:20.14.0-buster-slim

# Arguments defined in docker-compose.yml
ARG user
ARG uid

RUN deluser node && \
    useradd -u $uid -m $user

WORKDIR /app
USER $user

