import mongoose from 'mongoose'

const TEST_DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test_db'

export async function connectTestDB() {
  await mongoose.connect(TEST_DB_URI, {
    dbName: 'test_db',
  })
}

export async function clearTestDB() {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany({})
  }
}

export async function disconnectTestDB() {
  await mongoose.disconnect()
}
