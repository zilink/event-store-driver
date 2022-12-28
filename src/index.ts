import axios, { AxiosError } from 'axios';

export type eventStoreOptions = {
  eventStoreUrl: string;
  data?: { [p: string]: unknown };
};

export class EventStoreDriver {
  private static options?: eventStoreOptions;

  private readonly opts: eventStoreOptions;
  private preDefinedData: { [p: string]: unknown } = {};

  constructor() {
    if (!EventStoreDriver.options)
      throw new Error("Please use 'EventStoreDriver.factory()' first!");

    this.opts = EventStoreDriver.options;
  }

  setData(data: { [p: string]: unknown }): this {
    this.preDefinedData = data;
    return this;
  }

  async send(event: string, data: { [p: string]: unknown }): Promise<void> {
    try {
      await axios.post(this.opts.eventStoreUrl, {
        ...this.opts.data,
        ...this.preDefinedData,
        time: new Date().toISOString(),
        data,
      });
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
