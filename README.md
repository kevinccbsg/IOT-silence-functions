# IOT-silence-functions

Some functions with basic logic for silence standup bot

# To run this project you need this .env structure

```
MONGO_URL=<MONGO_URL>
BUS_URL=<BUS_URL>
WEBHOOK=<WEBHOOK>
```

and then execute

```
npm start
```

**Note** if you want to run locally

```
docker run -d --name amqp.test -p 5672:5672 rabbitmq
```

```
npm run docker
```