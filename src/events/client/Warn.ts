import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class Warn extends Event {
  constructor() {
    super({
      name: 'warn',
    });
  }

  public run(client: ForceClient, message: string): void {
    this.logger.warn(`The client sent a general warning: ${message}.`);
  }
}
