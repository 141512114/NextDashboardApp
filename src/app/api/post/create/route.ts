import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import matter from "gray-matter";
import { NodeHtmlMarkdown } from "node-html-markdown";

export async function POST(request: Request) {
  const postsDirectory = path.join(process.cwd(), "src", "blogposts");

  try {
    const data: BlogPost = await request.json();

    const fullPath = path.join(postsDirectory, `${data.id}.md`);
    // Convert HTML content to the appropriate markdown
    let post_content = "";
    if (data.contentHtml) {
      const parsedContent = NodeHtmlMarkdown.translate(data.contentHtml);
      post_content = parsedContent;
    }

    // Build the new markdown file
    const createFileContents = matter.stringify(String(post_content), {
      title: data.title,
      author: data.author,
      date: data.date,
    });

    fs.writeFileSync(fullPath, createFileContents);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove file" },
      { status: 500 }
    );
  }
}
