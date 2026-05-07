import { Hono } from 'hono'
import { cors } from 'hono/cors'
import PocketBase from 'pocketbase'

const app = new Hono()

// Enable CORS for the frontend
app.use('/*', cors())

// PocketBase Configuration
const POCKETBASE_URL = 'https://reader-unless.pockethost.io'
const pb = new PocketBase(POCKETBASE_URL)

app.get('/', (c) => {
  return c.json({
    message: 'HAMCO ARABIA Equipment API',
    version: '1.1.0',
    status: 'Connected to PocketBase',
    url: POCKETBASE_URL
  })
})

// Get all equipment from PocketBase
app.get('/api/equipment', async (c) => {
  try {
    // Fetch from 'equipment' collection
    const records = await pb.collection('equipment').getFullList({
        sort: '-created',
    });
    
    const equipment = records.map(record => ({
      id: record.id,
      name: record.name,
      category: record.category,
      price: record.price,
      image: record.image ? `${POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.image}` : '/assets/helmet.png',
      description: record.description
    }))

    return c.json(equipment)
  } catch (error) {
    console.error('PocketBase fetch error:', error)
    return c.json([
      {
        id: 4,
        name: "Professional Safety Helmet",
        category: "Safety Gear",
        price: "$45",
        image: "/assets/helmet.png",
        description: "Configure your PocketBase collection 'equipment' to see live data here."
      },
      {
        id: 5,
        name: "High-Visibility Safety Jacket",
        category: "Safety Gear",
        price: "$65",
        image: "/assets/jacket.png",
        description: "Host your data world-wide with Cloudflare and PocketBase."
      }
    ])
  }
})

export default app
