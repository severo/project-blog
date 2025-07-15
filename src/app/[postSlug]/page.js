import React from "react";
import { notFound } from "next/navigation";

import BlogHero from "@/components/BlogHero";

import MDX_COMPONENTS from "@/helpers/mdx-components";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

export async function generateMetadata({ params: { postSlug } }) {
  const blogPost = await loadBlogPost(postSlug);
  if (!blogPost) {
    return {};
  }
  const {
    frontmatter: { title, abstract },
  } = blogPost;
  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  };
}

async function BlogPost({ params: { postSlug } }) {
  const blogPost = await loadBlogPost(postSlug);
  if (!blogPost) {
    notFound();
  }
  const {
    frontmatter: { title, abstract, publishedOn },
    content,
  } = blogPost;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={MDX_COMPONENTS} />
      </div>
    </article>
  );
}

export default BlogPost;
