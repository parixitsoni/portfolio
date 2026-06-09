import { NextResponse } from "next/server";
import { exec } from "child_process";

export const dynamic = "force-static";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const branch = searchParams.get("branch");

  if (!branch || !["main", "theme-interactive-network"].includes(branch)) {
    return NextResponse.json({ error: "Invalid branch name" }, { status: 400 });
  }

  return new Promise((resolve) => {
    exec(`git checkout ${branch}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Git checkout execution error: ${error.message}`);
        resolve(NextResponse.json({ error: error.message, stderr }, { status: 500 }));
        return;
      }
      resolve(NextResponse.json({ success: true, stdout, stderr }));
    });
  });
}
