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
  },
});
```

### Set predefined data on each instance

```typescript
const eventStoreDriver = new EventStoreDriver();

eventStoreDriver.setData({
  userId: 9876,
  sessionId: 'df1a3d48-e44e-4714-920e-576e29f54e21',
});
```

### Send event

```typescript
type User = {
  firstName: string;
  lastName: string;
}

await eventStoreDriver.send<User>('UserUpdated', {
  firstName: 'joe',
  lastName: 'black',
});
```

- The `event` and `time` properties is auto-generated
- `send` method is generic and data type should provide as object.

## Example

```typescript
import { EventStoreDriver } from 'event-store-driver';

EventStoreDriver.factory({
  eventStoreUrl: 'http://event-store:8080',
  autoCorrelationId: 'uuid-v4',
  data: {
    microservice: 'users',
  },
});

const eventStoreDriver = new EventStoreDriver();

eventStoreDriver.setData({
  sessionId: 'df1a3d48-e44e-4714-920e-576e29f54e21',
});

eventStoreDriver.send('UserAdded', {
  email: 'user@example.com',
  role: 'admin',
  username: 'foo',
});

/* API Request
POST http://event-store:8080
{
  event: 'UserAdded'
  time: '2019-09-07T15:50+00Z',
  microservice: 'users',
  correlationId: '1df84b34-24ff-4e2c-909f-5752cc5695a0',
  sessionId: 'df1a3d48-e44e-4714-920e-576e29f54e21',
  email: 'user@example.com',
  role: 'admin',
  username: 'foo'
}
 */
```
