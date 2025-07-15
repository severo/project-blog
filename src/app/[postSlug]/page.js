import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

const cachedLoadBlogPost = React.cache(loadBlogPost);

export async function generateMetadata({ params: { postSlug } }) {
  const {
    frontmatter: { title, abstract, publishedOn },
  } = await cachedLoadBlogPost(postSlug);

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  };
}

async function BlogPost({ params: { postSlug } }) {
  const {
    frontmatter: { title, abstract, publishedOn },
    content,
  } = await cachedLoadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
