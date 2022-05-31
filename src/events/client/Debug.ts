import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class Debug extends Event {
  constructor() {
    super({
      name: 'debug',
    });
  }

  public run(client: ForceClient, message: string): void {
    if (process.env.NODE_ENV === 'development') {
      this.logger.debug(message);
    }
  }
}
