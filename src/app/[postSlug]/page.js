import React from "react";
import dynamic from "next/dynamic";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);
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
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
