import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class ShardReconnecting extends Event {
  constructor() {
    super({
      name: 'shardReconnecting',
    });
  }

  public run(client: ForceClient, shardId: number): void {
    this.logger.info(`Shard ${shardId} is reconnecting.`);
  }
}
