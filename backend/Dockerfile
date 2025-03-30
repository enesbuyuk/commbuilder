# syntax=docker/dockerfile:1

FROM golang:tip-alpine3.21 AS builder
WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -o server

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/server .

CMD ["./server"]