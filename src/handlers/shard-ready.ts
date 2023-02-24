import Eris from 'eris';

export const shardReadyHandler = async (client: Eris.Client, id: number) => {
  console.log(`Shard ${id} is ready!`);
};
