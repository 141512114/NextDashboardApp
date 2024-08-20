const deletePost = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/delete/${slug}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default deletePost;
