import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreData from "../components/load-more.component";

const HomePage = () => {
    const [blogs, setBlogs] = useState({ results: [], totalDocs: 0 });
    const [trendingBlogs, setTrendingBlogs] = useState([]);
    const [pageState, setPageState] = useState("Home");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const categories = ["programming", "film-making", "hollywood", "financial", "cooking", "social-media", "tech", "travel"];

    const fetchLatestBlogs = async ({page = 1}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/latest-blogs?page=${page}`);
            console.log("Response data:", response.data); // Check the structure
            const data = response.data || {};

            // Check if blogs is an array
            if (!Array.isArray(data.blogs)) {
                console.error("Expected 'blogs' to be an array. Received:", data.blogs);
                throw new Error("Expected 'blogs' to be an array.");
            }

            let formattedData = await filterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "/all-latest-blog-count"
            });

            setBlogs(formattedData);
        } catch (err) {
            console.error("Fetch latest blogs error:", err);
            setError("Failed to fetch latest blogs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogsByCategory = async ({ page = 1 }) => {
        setLoading(true);
        setError(null);
        try {
            console.log("Fetching blogs for category:", pageState);
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/latest-blogs`, 
                { tag: pageState, page },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const data = response.data || {}; // Ensure data is defined

            // Check if blogs is an array
            if (!Array.isArray(data.blogs)) {
                throw new Error("Invalid data structure");
            }

            console.log("Fetched blogs data:", data.blogs);
            setBlogs(data.blogs.length ? { results: data.blogs, totalDocs: data.totalDocs } : { results: [], totalDocs: 0 });
        } catch (err) {
            console.error("Error fetching blogs:", err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingBlogs = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/trending-blogs`);

            
            setTrendingBlogs(data.blogs || []);
        } catch (err) {
            console.error("Error fetching trending blogs:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadBlogByCategory = (category) => {
        setBlogs({ results: [], totalDocs: 0 });
        if (pageState === category) {
            setPageState("Home");
            return;
        }
        setPageState(category);
        setPage(1);
        console.log("Updated blog category:", category);
    };

    useEffect(() => {
        if (pageState === "Home") {
            fetchLatestBlogs(page);
        } else {
            fetchBlogsByCategory({ page });
        }
        fetchTrendingBlogs();
    }, [pageState, page]);

    return (
        <section className="h-cover flex justify-center gap-10">
            <div className="w-full">
                <button onClick={()=>{console.log(blogs)}}></button>
                <InPageNavigation routes={[pageState, "Trending blogs"]} defaultHidden={[]}>
                    <>
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <NoDataMessage message={error} />
                        ) : (
                            // Corrected rendering logic
                            blogs?.results?.length > 0 ? (
                                blogs.results.map((blog, i) => (
                                    <BlogPostCard key={blog.id || i} content={blog} author={blog.author?.personal_info} />
                                ))
                            ) : (
                                <NoDataMessage message="No blogs published" />
                            )
                        )}
                        <LoadMoreData state={blogs} fetchDataFun={(pageState === "Home" ? fetchLatestBlogs : fetchBlogsByCategory)} />
                    </>
                    {loading ? <Loader /> : trendingBlogs.length > 0 ? trendingBlogs.map((blog, i) => (
                        <MinimalBlogPost key={blog.id || i} blog={blog} index={i} />
                    )) : <NoDataMessage message="No trending blogs available" />}
                </InPageNavigation>
            </div>

            <div>
                <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
                    <div className="flex flex-col gap-10">
                        <h1 className="font-medium text-xl mb-8">Stories from all interests</h1>
                        <div className="flex gap-3 flex-wrap">
                            {categories.map((category, i) => (
                                <button
                                    onClick={() => loadBlogByCategory(category)}
                                    className={`tag ${pageState === category ? "bg-black text-white " : ""}`}
                                    key={i}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div>
                            <h1 className="font-medium text-xl mb-8">Trending<i className="fi fi-rr-arrow-trend-up"></i></h1>
                            {loading ? <Loader /> : trendingBlogs.length > 0 ? trendingBlogs.map((blog, i) => (
                                <MinimalBlogPost key={blog.id || i} blog={blog} index={i} />
                            )) : <NoDataMessage message="No trending blogs available" />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
