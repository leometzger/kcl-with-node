FROM openjdk:8-jdk

# Install Node.js and npm
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs 

COPY . /app
WORKDIR /app
RUN npm install
USER root

CMD node_modules/aws-kcl/bin/kcl-bootstrap --properties sample.properties -e
