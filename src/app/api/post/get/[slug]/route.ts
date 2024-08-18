import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src", "blogposts");

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const blogPostWithHTML: BlogPost & { contentHtml: string } = {
    id: slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };

  return NextResponse.json({ data: blogPostWithHTML }, { status: 200 });
}
