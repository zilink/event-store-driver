# Event Store Driver

## How to use

### Initial Driver

```typescript
import { EventStoreDriver } from 'event-store-driver';

EventStoreDriver.factory(options);
```

Options:

| Name              | Type   | Default | Description                                                                                                      |
|-------------------|--------|---------|------------------------------------------------------------------------------------------------------------------|
| eventStoreUrl     | string |         | The URL of EventStore                                                                                            |
| data              | object |         | Predefined data to send to EventStore on each request.                                                           |
| autoCorrelationId | string | uuid-v4 | Enable auto generation of correlation ID. Options: `uuid-v4`. The property of correlation ID is `correlationId`. |

### Set predefined data globally

```typescript
EventStoreDriver.factory({
  data: {
    microservice: 'users',
    pid: process.pid,
  }
});
```

### Set predefined data on each instance

```typescript
const eventStoreDriver = new EventStoreDriver();

eventStoreDriver.setData({
  userId: 9876,
  sessionId: 'df1a3d48-e44e-4714-920e-576e29f54e21'
});
```

### Send event

```typescript
await eventStoreDriver.send('UserUpdated', {
  firstName: 'joe',
  lastName: 'black',
});
```
