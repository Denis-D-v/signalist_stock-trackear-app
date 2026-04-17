import { randomUUID } from 'crypto';

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI must be set within .env');
  process.exit(1);
}

const client = new MongoClient(uri);
const testId = randomUUID();

try {
  await client.connect();

  const db = client.db();
  const collection = db.collection('db_test_checks');
  const payload = {
    testId,
    createdAt: new Date(),
    source: 'npm-test-db-crud',
  };

  await collection.insertOne(payload);
  const savedDoc = await collection.findOne({ testId });
  const deleteResult = await collection.deleteOne({ testId });

  console.log('Database CRUD test works.');
  console.log(`Database: ${db.databaseName}`);
  console.log(`Inserted: ${Boolean(savedDoc)}`);
  console.log(`Deleted count: ${deleteResult.deletedCount}`);
} catch (error) {
  const message =
    error instanceof Error ? error.message : 'Unknown database error';

  console.error('Database CRUD test failed.');
  console.error(message);
  process.exitCode = 1;
} finally {
  await client.close();
}
