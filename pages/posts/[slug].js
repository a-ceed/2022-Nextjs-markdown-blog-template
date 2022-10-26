import fs from "fs";
import matter from "gray-matter";
import md from 'markdown-it';
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import avatar from "../../public/dark8.png";


// The page for each post
export default function Post({frontmatter, content}) {
    const {title, author, annotation, category, date, bannerImage, tags} = frontmatter

    return <main id="site-main" className="site-main outer">
        <div  className="inner" >
        <article className="post-full post tag-getting-started featured">
            <header className="post-full-header">
                <section className="post-full-tags">
                    <Link href="/tag/getting-started">
                        <a>{tags}</a>
                    </Link>
                </section>

                <h1 className="post-full-title">{title}</h1>
                <p className="post-full-custom-excerpt">{annotation}</p>
                <div className="post-full-byline">
                    <section className="post-full-byline-content">
                        <ul className="author-list">
                            <li className="author-list-item">
                                <a className="author-avatar">
                                    <Image src={"https://temniyecolog.ru/_next/static/media/dark8.5416d8b1.png"} alt="Экология Тёмного эколога" layout="responsive" quality="25" width="36" height="36" />
                                </a>
                            </li>
                        </ul>
                        <section className="post-full-byline-meta">
                            <h4 className="author-name">{author}</h4>
                            <div className="byline-meta-content">
                                <time className="byline-meta-date">{date}</time>
                            </div>
                        </section>
                    </section>
                </div>

            </header>
        </article>

            <div className="imgcontainer"><img src={"https://temniyecolog.ru/"+bannerImage}/></div>

            <section className="post-full-content">
        <div className="post-content load-external-scripts" dangerouslySetInnerHTML={{ __html: md().render(content) }} />
            </section>
        </div>
    </main>
}

// Generating the paths for each post
export async function getStaticPaths() {

  // Get list of all files from our posts directory
  const files = fs.readdirSync("posts");
  // Generate a path for each one
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  // return list of paths
  return {
    paths,
    fallback: false,
  };
}


// Generate the static props for the page
export async function getStaticProps({ params: { slug } }) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
  }