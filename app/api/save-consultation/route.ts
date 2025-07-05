import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // In a real application, you would save this data to your database (e.g., Neon).
    // For now, we'll just log it to the console.
    console.log("Received consultation data:", data)

    // Example of database insertion (you'll need to set up your Neon client)
    /*
    import { sql } from '@vercel/postgres';
    const { name, email, company, service, budget } = data;
    await sql`
      INSERT INTO consultations (name, email, company, service, budget) 
      VALUES (${name}, ${email}, ${company}, ${service}, ${budget});
    `;
    */

    return NextResponse.json({ message: 'Data received successfully' }, { status: 200 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ message: 'Failed to receive data' }, { status: 500 })
  }
} 