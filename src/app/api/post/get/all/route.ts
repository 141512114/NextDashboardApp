import { NextResponse } from "next/server";
import * as fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "blogposts");

export async function GET(request: Request) {
  try {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      // Remove the '.md' extension off the file name to get the id
      const slug = fileName.replace(/\.md$/, "");

      // Read the markdown file as a string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");

      // Parse the post metadata section
      const matterResult = matter(fileContents);

      const blogPost: BlogPostThumb = {
        id: slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
      };

      return blogPost;
    });

    return NextResponse.json(
      { data: allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1)) },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get all posts" },
      { status: 500 }
    );
  }
}
