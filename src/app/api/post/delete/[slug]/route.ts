import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const postsDirectory = path.join(process.cwd(), "src", "blogposts");

  try {
    const slug = params.slug;

    const fileToRemove = path.join(postsDirectory, `${slug}.md`);
    fs.unlinkSync(fileToRemove);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove file" },
      { status: 500 }
    );
  }
}
