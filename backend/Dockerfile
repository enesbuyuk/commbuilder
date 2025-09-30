# syntax=docker/dockerfile:1

FROM golang:tip-alpine3.21 AS builder
WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

FROM alpine:latest
WORKDIR /root/
RUN apk add --no-cache curl
COPY --from=builder /app/server .

CMD ["./server"]