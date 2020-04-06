FROM python:3.8.2-buster

WORKDIR /usr/src/app

RUN apt-get update && apt-get install curl && \
  curl -sL https://deb.nodesource.com/setup_13.x | bash && \
  apt-get install -y nodejs

COPY package.json .
RUN npm install --quiet
ENV PATH /usr/src/node_modules/.bin:$PATH

COPY . .

RUN pip install -r /usr/src/app/server/requirements.txt