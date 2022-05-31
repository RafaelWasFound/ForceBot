import logger from '../../logger';
import EventOptions from '../../types/EventOptions';
import ForceClient from '../ForceClient';

export default abstract class Event {
  private name: string;

  protected logger: typeof logger;

  constructor(options: EventOptions) {
    this.name = options.name;

    this.logger = logger;
  }

  public getName(): string {
    return this.name;
  }

  public checkRequirements(): boolean {
    if (!this.name ?? !this.run) return false;
    return true;
  }

  public abstract run(client: ForceClient, ...args: unknown[]): unknown;
}
