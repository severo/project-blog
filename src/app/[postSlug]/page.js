import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);
const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

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
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            CircularColorsDemo,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
