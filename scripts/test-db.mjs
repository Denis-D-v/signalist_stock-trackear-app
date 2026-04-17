import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI must be set within .env');
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();

  const db = client.db();
  const ping = await db.command({ ping: 1 });

  console.log('Database connection works.');
  console.log(`Database: ${db.databaseName}`);
  console.log(`Ping: ${JSON.stringify(ping)}`);
} catch (error) {
  const message =
    error instanceof Error ? error.message : 'Unknown database error';

  console.error('Database connection failed.');
  console.error(message);
  process.exitCode = 1;
} finally {
  await client.close();
}
