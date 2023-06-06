#FROM nginx:1.17-alpine
FROM --platform=linux/x86_64 nginx:1.17-alpine

EXPOSE 80

VOLUME /tmp

ARG DIST_DIR=dist/uj-frontend
COPY ${DIST_DIR} /usr/share/nginx/html


