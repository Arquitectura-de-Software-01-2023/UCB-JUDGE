#FROM eclipse-temurin:11-jdk-alpine
FROM --platform=linux/x86_64 eclipse-temurin:11-jdk
#FROM arm64v8/eclipse-temurin:11-jdk

EXPOSE 8711

RUN mkdir -p /opt/ucb-judge/logs/uj-service-discovery
VOLUME /opt/ucb-judge/logs/uj-service-discovery

VOLUME /tmp

ENV PORT="PORT"

ENV LOGSTASH_SERVER_URI="LOGSTASH_SERVER_URI"

ENV CONFIG_SERVER_URI="CONFIG_SERVER_URI"

ENV EUREKA_SERVER_URI="EUREKA_SERVER_URI"
ENV CONFIG_SERVER_PROFILE="CONFIG_SERVER_PROFILE"
ENV ZIPKIN_SERVER_URI="ZIPKIN_SERVER_URI"

ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","com.ucbjudge.servicediscovery.ServiceDiscoveryApplicationKt"]