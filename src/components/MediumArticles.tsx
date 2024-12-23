import Parser from 'rss-parser';
import Link from "next/link";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import IndexPageSectionLayout from "@/components/IndexPageSectionLayout";

interface Post {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    author: string;
}

export default async function MediumArticles() {
    const rssParser = new Parser();
    let latestPosts:Post[] = [];

    const translations = {
        generalTranslations: await getTranslations("General"),
        pageTranslations: await getTranslations("IndexPage")
    }

    try {
        const feed = await rssParser.parseURL(`${process.env.NEXT_PUBLIC_MEDIUM_URL}/feed`);
        latestPosts = feed.items.slice(0, 10).map(item => {
            const rawDescription = item['content:encoded'] || item.description || 'No description available';
            const cleanDescription = rawDescription && typeof rawDescription === 'string'
                ? rawDescription.replace(/(<([^>]+)>)/gi, '')
                    .substring(0, 300)
                    .replace(/\s+\S*$/, ' ...')
                : 'No description available';

            return {
                title: item.title || "Untitled",
                link: item.link || "#",
                pubDate: item.pubDate || "Unknown Date",
                author: item.creator || item.author || "Unknown",
                description: cleanDescription
            };
        });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
    }
    return (
        <IndexPageSectionLayout title={translations.pageTranslations("ourMediumArticles")} indexPageSectionId={"medium-articles"}>
            {latestPosts.map((post, index) => (
                <div key={index}  className={"lg:w-1/2 py-8 px-12 md:px-4 sm:pb-5"}>
                    <div className="p-12 bg-white flex flex-col items-start shadow-lg rounded-lg h-full overflow-hidden">
                        {/*<div className="w-full bg-gray-100 flex justify-center items-center"bg-whitebg-whitebg-whitebg-white>*/}
                        <span
                            className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                                    ARTICLE
                                </span>
                        <Link
                            href={post.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 inline-flex items-center"
                        >
                            <h3 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                                {post.title}
                            </h3>
                        </Link>
                        <p className="leading-relaxed mb-8">
                            {post.description}
                        </p>
                        <div
                            className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                            <Link
                                href={post.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 inline-flex items-center"
                            >{translations.generalTranslations("readMore")}
                                <svg
                                    className="w-4 h-4 ml-2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                            <span className="text-gray-400 ml-auto inline-flex items-center leading-none text-sm">
                                        {new Date(post.pubDate).toDateString()}
                                    </span>
                        </div>
                        <div className="inline-flex items-center">
                            <Image
                                alt="author"
                                src={"/theme/default-profile-photo.png"}
                                width={100}
                                height={100}
                                className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                            />
                            <span className="flex-grow flex flex-col pl-4">
                                        <span className="title-font font-medium text-gray-900">
                                            {post.author}
                                        </span>
                                        <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                                            ARTICLE AUTHOR
                                        </span>
                                    </span>
                        </div>
                    </div>
                </div>
            ))}
        </IndexPageSectionLayout>
    );
}