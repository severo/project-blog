import RSS from "rss";
import {
  BLOG_TITLE,
  BLOG_DESCRIPTION,
  BLOG_URL,
  RSS_PATH,
} from "../constants.js";
import { getBlogPostList, writeFile } from "../helpers/file-helpers.js";

async function buildRss() {
  const site_url =
    process.env.NODE_ENV === "production" ? BLOG_URL : "http://localhost:3000"; // <- might not be the exact port

  const feed = new RSS({
    title: `${BLOG_TITLE} • RSS feed`,
    description: BLOG_DESCRIPTION,
    feed_url: `${site_url}${RSS_PATH}`,
    site_url,
    language: "en",
    pubDate: new Date().toISOString(),
  });
  const blogPostList = await getBlogPostList();
  // only include the last 20 posts
  for (const blogPost of blogPostList.slice(0, 20)) {
    const { title, abstract, slug, publishedOn } = blogPost;
    feed.item({
      title,
      description: abstract,
      url: `${site_url}/${slug}`,
      guid: slug,
      date: publishedOn,
    });
  }
  const xml = feed.xml({ indent: true });

  await writeFile(`public${RSS_PATH}`, xml);
}

console.info("➡️ Building the RSS feed");
try {
  await buildRss();
} catch (e) {
  console.error("⛔ Build failed", e);
}
console.info(`🎉 RSS feed written to public${RSS_PATH}`);
