import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class ShardResume extends Event {
  constructor() {
    super({
      name: 'shardResume',
    });
  }

  public run(client: ForceClient, shardId: number): void {
    this.logger.info(`Shard ${shardId} has been resumed.`);
  }
}
