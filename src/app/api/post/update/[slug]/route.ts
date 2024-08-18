import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src", "blogposts");

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data: BlogPost = await request.json();
    const slug = params.slug;

    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parse the post metadata section
    const matterResult = matter(fileContents);

    const parsedContent = remark().use(html).parse(data.contentHtml);

    const updatedFileContents = matter.stringify(String(parsedContent), {
      title: matterResult.data.title,
      date: matterResult.data.date,
    });

    fs.writeFileSync(fullPath, updatedFileContents);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 }
    );
  }
}
