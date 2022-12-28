# Event Store Driver

## How to use

### Initial Driver

```typescript
import { EventStoreDriver } from 'event-store-driver';

EventStoreDriver.factory(options);
```

Options:

| Name          | Type   | Default | Description                                        |
|---------------|--------|---------|----------------------------------------------------|
| eventStoreUrl | string |         | The URL of EventStore                              |
| data          | object |         | Default data to send to EventStore on each request |

Examples:

```typescript
EventStoreDriver.factory({
  eventStoreUrl: 'http://event-store:4343',
  data: {
    Microservice: 'users',
    Pid: process.pid,
  },
});
```

### Set predefined data on each instance

```typescript
const eventStoreDriver = new EventStoreDriver();

eventStoreDriver.setData({
  CorrelationId: '123456',
  UserId: 9876,
});
```

### Send event

```typescript
await eventStoreDriver.send('UserUpdated', {
  firstName: 'joe',
  lastName: 'black',
});
```

Data sent:

```
{
  Microservice: 'users',
  Pid: 1234,
  CorrelationId: '123456',
  UserId: '9876',
  firstName: 'joe',
  lastName: 'black'
}
```
