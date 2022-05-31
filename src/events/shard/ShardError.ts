import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class ShardError extends Event {
  constructor() {
    super({
      name: 'shardError',
    });
  }

  public run(client: ForceClient, error: Error, shardId: number): void {
    this.logger.error(`An error occurred on Shard ${shardId}: ${error.message}`);
  }
}
