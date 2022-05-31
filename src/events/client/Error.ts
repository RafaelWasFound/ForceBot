import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class ErrorEvent extends Event {
  constructor() {
    super({
      name: 'error',
    });
  }

  public run(client: ForceClient, error: Error): void {
    this.logger.error(`The client encounters an error: ${error.message}.`);
  }
}
