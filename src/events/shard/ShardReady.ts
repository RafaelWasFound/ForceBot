import ForceClient from '../../structures/ForceClient';
import Event from '../../structures/event/Event';

export default class ShardReady extends Event {
  constructor() {
    super({
      name: 'shardReady',
    });
  }

  public run(client: ForceClient, shardId: number): void {
    client.user?.setPresence({
      activities: [
        {
          name: `yours and several servers | Shard ${shardId}`,
          type: 'WATCHING',
        },
      ],
      status: 'idle',
      shardId,
    });

    this.logger.info(`Shard ${shardId} has been connected.`);
  }
}
