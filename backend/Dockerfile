FROM gradle:8.5-jdk17 AS build

WORKDIR /app

COPY . .

RUN gradle clean bootJar -x test

FROM openjdk:17-sdk-slim

WORKDIR /app

COPY . .

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", ".jar" ]