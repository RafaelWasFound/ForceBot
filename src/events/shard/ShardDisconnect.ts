import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class ShardDisconnect extends Event {
  constructor() {
    super({
      name: 'shardDisconnect',
    });
  }

  public run(client: ForceClient, event: CloseEvent, shardId: number): void {
    this.logger.warn(`Shard ${shardId} has been disconnected: ${event.reason}.`);
  }
}
