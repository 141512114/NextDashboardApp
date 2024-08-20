import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import matter from "gray-matter";
import { NodeHtmlMarkdown } from "node-html-markdown";

const postsDirectory = path.join(process.cwd(), "src", "blogposts");

export async function POST(request: Request) {
  try {
    const data: BlogPost = await request.json();

    const fullPath = path.join(postsDirectory, `${data.id}.md`);
    // Convert HTML content to the appropriate markdown
    const parsedContent = NodeHtmlMarkdown.translate(data.contentHtml);
    // Build the new markdown file
    const updatedFileContents = matter.stringify(String(parsedContent), {
      title: data.title,
      date: data.date,
    });

    fs.writeFileSync(fullPath, updatedFileContents);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove file" },
      { status: 500 }
    );
  }
}
