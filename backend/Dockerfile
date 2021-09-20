FROM python:3.9-alpine
MAINTAINER Rashid

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps \
      gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

RUN mkdir /book_management_project
WORKDIR /book_management_project
COPY ./book_management_project /book_management_project

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/media

RUN adduser -D user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web

USER user
