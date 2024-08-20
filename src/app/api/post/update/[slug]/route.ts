import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import matter from "gray-matter";
import { NodeHtmlMarkdown } from "node-html-markdown";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const postsDirectory = path.join(process.cwd(), "src", "blogposts");

  try {
    const data: BlogPost = await request.json();
    const slug = params.slug;

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse the post metadata section
    const matterResult = matter(fileContents);
    let new_post_content = matterResult.content;
    if (data.contentHtml && data.contentHtml !== "") {
      // Convert HTML content to the appropriate markdown
      const parsedContent = NodeHtmlMarkdown.translate(data.contentHtml);
      new_post_content = parsedContent;
    }

    let new_post_title = matterResult.data.title;
    // If a new title is proposed --> update the value of new_post_title and set the new title
    if (data.title && data.title !== "") {
      new_post_title = data.title;
    }
    // Build the new markdown file
    const updatedFileContents = matter.stringify(String(new_post_content), {
      title: new_post_title,
      date: matterResult.data.date, // won't be updated, so just pass the original date
    });
    // Update the existing file with the new content
    fs.writeFileSync(fullPath, updatedFileContents);
    if (data.id !== slug) {
      fs.renameSync(fullPath, path.join(postsDirectory, `${data.id}.md`));
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 }
    );
  }
}
