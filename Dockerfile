FROM python:3.8.2-buster

WORKDIR /usr/src/app

RUN apt-get update && apt-get install curl && \
  curl -sL https://deb.nodesource.com/setup_13.x | bash && \
  apt-get install -y nodejs

COPY package.json package-lock.json ./
COPY ./server/requirements.txt /usr/src/app/server/

RUN npm install --quiet
RUN pip install -r /usr/src/app/server/requirements.txt

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

