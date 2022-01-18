FROM golang:1.16-alpine

WORKDIR /API
COPY . .
RUN go run main.go
RUN go build

EXPOSE 8080

CMD 