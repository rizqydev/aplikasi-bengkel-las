import { NextRequest } from 'next/server'
import { connectTestDB, clearTestDB, disconnectTestDB } from '../testUtils'
import User from '@/models/User'
import { POST as createUser, GET as listUsers } from '@/app/api/users/route'
import { PUT as updateUser, DELETE as deleteUser } from '@/app/api/users/[id]/route'

// helper to build a NextRequest
function makeRequest(body: any, method: string = 'POST') {
  return new NextRequest('http://localhost:3000/api/users', {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

beforeAll(async () => {
  await connectTestDB()
})

afterEach(async () => {
  await clearTestDB()
})

afterAll(async () => {
  await disconnectTestDB()
})

describe('User API handlers', () => {
  let userId: string

  it('creates a user', async () => {
    const req = makeRequest({
      username: 'rizqy',
      password: 'nurhaqy',
      name: 'rizqy',
      userRole: 'admin',
    })
    const res = await createUser(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.name).toBe('rizqy')
    userId = data._id
  })

  it('lists users', async () => {
    await User.create({
      username: 'xxx',
      name: 'Mouse',
      userRole: 'user',
      passwordHash: 'xxdfsfs23213',
    })

    const res = await listUsers()
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(1)
  })

  it('updates a user', async () => {
    const created = await User.create({
      username: 'xxx',
      name: 'Mouse',
      passwordHash: 'Logitech',
      userRole: 'user',
    })

    userId = created._id.toString()

    const req = makeRequest({ name: 'Ujang' }, 'PUT')
    const res = await updateUser(req, { params: { id: userId } })
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.name).toBe('Ujang')
  })

  it('deletes a user', async () => {
    const created = await User.create({
      username: 'xxx',
      name: 'Mouse',
      userRole: 'user',
      passwordHash: 'xxdfsfs23213',
    })

    userId = created._id.toString()

    const req = new NextRequest(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
    })
    const res = await deleteUser(req, { params: { id: userId } })
    const data = await res.json()

    expect(res.status).toBe(200)
    // expect(data.success).toBe(true)
  })
})
