import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataPath = path.join(process.cwd(), 'learning.md');

export async function GET() {
  try {
    const content = await fs.readFile(dataPath, 'utf8');
    
    // Split into categories first
    const categorySections = content.split(/\n##\s+/);
    const parsedData = [];
    let idCounter = 1;

    categorySections.forEach((catSection, catIdx) => {
      if (catIdx === 0) return; // Skip header before first ##

      const lines = catSection.split('\n');
      const category = lines[0].trim();
      const contentUnderCat = lines.slice(1).join('\n');
      
      // Split by --- or by ###
      const questions = contentUnderCat.split(/\n---\n/);
      
      questions.forEach(qBlock => {
        const questionMatch = qBlock.match(/###\s+(.*)/);
        if (questionMatch) {
          const question = questionMatch[1].trim();
          let theory = qBlock.replace(/###\s+(.*)/, '').trim();
          
          // Try to extract companies if present
          let companies = [];
          const companyMatch = theory.match(/\*\*Asked In:\*\*\s*(.*)/i);
          if (companyMatch) {
            companies = companyMatch[1].split(',').map(c => c.trim());
            theory = theory.replace(/\*\*Asked In:\*\*\s*(.*)/i, '').trim();
          }

          parsedData.push({
            id: idCounter++,
            question,
            theory,
            category,
            companies
          });
        }
      });
    });

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Parse Error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const { question, theory, companies, category } = await request.json();
    
    const newItem = `
---

## ${category}

### ${question}
${theory}

**Asked In:** ${companies.join(', ')}
`;
    
    await fs.appendFile(dataPath, newItem);
    
    // Re-fetch all data to return updated list
    return GET();
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
