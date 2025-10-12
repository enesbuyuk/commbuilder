FROM golang:1.25.1-alpine3.22 AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN go run scripts/create_language_index.go
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

FROM alpine:latest
WORKDIR /root/
RUN apk add --no-cache curl
COPY --from=builder /app/server .

CMD ["./server"]