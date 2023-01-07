import axios, { AxiosError } from 'axios';
import { v4 as UUIDv4 } from 'uuid';

export type eventStoreOptions = {
  eventStoreUrl: string;
  data?: { [p: string]: unknown };
  autoCorrelationId?: 'uuid-v4';
};

export class EventStoreDriver {
  private static options?: eventStoreOptions;

  private readonly opts: eventStoreOptions;
  private preDefinedData: { [p: string]: unknown } = {};

  constructor() {
    if (!EventStoreDriver.options)
      throw new Error("Please use 'EventStoreDriver.factory()' first!");

    this.opts = Object.assign(EventStoreDriver.options);

    if (this.opts.autoCorrelationId)
      switch (this.opts.autoCorrelationId) {
        case 'uuid-v4':
        default:
          this.setData({ correlationId: UUIDv4() });
      }
  }

  setData(data: { [p: string]: unknown }): this {
    this.preDefinedData = Object.assign(this.preDefinedData, data);
    return this;
  }

  async send(event: string, data: { [p: string]: unknown }): Promise<void> {
    try {
      data = Object.assign(
        { time: new Date().toISOString() },
        this.opts.data,
        this.preDefinedData,
        data,
      );
      await axios.post(this.opts.eventStoreUrl, data);
    } catch (e: unknown) {
      if (e instanceof AxiosError)
        throw new Error(
          `Unable to connect to ${this.opts.eventStoreUrl}. (Response Status: ${e.response?.status})`,
        );

      throw e;
    }
  }

  static factory(opts: eventStoreOptions) {
    EventStoreDriver.options = opts;
  }
}
