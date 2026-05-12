import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getLearningData } from '../../../utils/learning-parser';

export const dynamic = "force-dynamic";

const dataPath = path.join(process.cwd(), 'learning.md');

export async function GET() {
  try {
    const parsedData = await getLearningData();
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const { question, theory, companies, category, difficulty } = await request.json();
    
    const newItem = `
---

## ${category}

### ${question}
${theory}

**Asked In:** ${companies.join(', ')}
**Difficulty:** ${difficulty}
`;
    
    await fs.appendFile(dataPath, newItem);
    
    // Re-fetch all data to return updated list
    return GET();
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
