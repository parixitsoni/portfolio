import { promises as fs } from 'fs';
import path from 'path';

export async function getLearningData() {
  try {
    const dataPath = path.join(process.cwd(), 'learning.md');
    const content = await fs.readFile(dataPath, 'utf8');
    
    // Split into categories first - handling both \n## and \r\n##
    const categorySections = content.split(/\r?\n##\s+/);
    const parsedData = [];
    let idCounter = 1;

    categorySections.forEach((catSection, catIdx) => {
      if (catIdx === 0) return; // Skip header before first ##

      const lines = catSection.split(/\r?\n/);
      const category = lines[0].trim();
      const contentUnderCat = lines.slice(1).join('\n');
      
      // Split by ---
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
            const companyList = companyMatch[1].split(',').map(c => c.trim()).filter(c => c);
            companies = companyList;
            theory = theory.replace(/\*\*Asked In:\*\*\s*(.*)/i, '').trim();
          }

          // Try to extract difficulty if present
          let difficulty = "Medium"; // Default
          const difficultyMatch = theory.match(/\*\*Difficulty:\*\*\s*(.*)/i);
          if (difficultyMatch) {
            difficulty = difficultyMatch[1].trim();
            theory = theory.replace(/\*\*Difficulty:\*\*\s*(.*)/i, '').trim();
          }

          parsedData.push({
            id: idCounter++,
            question,
            theory,
            category,
            companies,
            difficulty
          });
        }
      });
    });

    return parsedData;
  } catch (error) {
    console.error("Parse Error:", error);
    return [];
  }
}
