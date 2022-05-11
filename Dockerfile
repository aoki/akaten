FROM --platform=linux/x86_64 node:18.1.0-slim

RUN apt-get update
RUN apt-get install -y locales git procps
ENV TZ=Asia/Tokyo
WORKDIR /app
