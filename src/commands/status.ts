import { Client, CommandInteraction } from 'eris';

export async function statusCommand(client: Client, command: CommandInteraction) {
  const uptime = process.uptime();
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor(uptime / 3600) % 24;
  const minutes = Math.floor(uptime / 60) % 60;
  const seconds = Math.floor(uptime) % 60;
  const uptimeString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  const ping = client.shards.map((shard) => shard.latency).reduce((a, b) => a + b, 0) / client.shards.size;
  const shardCount = client.shards.size;
  const maxShardCount = client.shards.map((shard) => shard.id).reduce((a, b) => Math.max(a, b), 0) + 1;
  const guildCount = client.guilds.size;

  await command.createMessage({
    embeds: [
      {
        title: 'Status',
        fields: [
          {
            name: 'Uptime',
            value: uptimeString,
          },
          {
            name: 'Ping',
            value: ping + ' ms',
          },
          {
            name: 'Shards',
            value: `${shardCount} / ${maxShardCount}`,
          },
          {
            name: 'Guilds',
            value: `${guildCount}`,
          },
        ],
      },
    ],
  });
}
