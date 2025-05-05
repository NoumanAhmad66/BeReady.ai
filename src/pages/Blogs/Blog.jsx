import React from "react";
import Card from "../../components/Blogcard/Card";
import "./Blog.css";
import heroimg from "../../assets/herosec/5.png";
import HeroSection from "../../components/HeroSection/HeroSection";
import { useState } from "react";
import useFetchBlogs from "../../Hooks/useFetchBlogs";
import { API } from "../../Hooks/config";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { blogs, loading, error } = useFetchBlogs(
    `${API.BEREADY}articles?populate=*`
  );
  const getRecentArticles = (blogs) => {
    return blogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)) // Sort by publishDate (descending)
      .slice(1, 5); // Get the last 7 articles
  };
  
  const recentArticles = blogs?.length ? getRecentArticles(blogs) : [];
  if (loading) {
    return (
      <div className="justify-center items-center flex h-screen">
        loading..............
      </div>
    );
  }

  if (error) {
    return <h2 className="text-center text-red-500">{error}</h2>;
  }

  if (recentArticles.length === 0) {
    return (
      <h2 className="text-center text-red-500">No Recent Articles available</h2>
    );
  }
  return (
    <>
      <HeroSection
        title={
          <>
            <span>Transforming</span> Interview Preparation with
            <br /> <span>AI-Powered Solutions</span>
          </>
        }
        description={
          "BeReady.ai provides AI-driven tools for streamlined interview prep, offering real-time skill assessment, personalized mock interviews, and industry-specific guidance to boost your success."
        }
        image={heroimg}
      />
         <div className="mt-5"> 
         <div className="max-w-md mx-auto">
        <svg className=" w-25 h-25 relative top-9 left-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          <input
                type="text"
                placeholder="Search blogs by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline focus:outline-green-600"
              />
    </div>
    </div>
      {searchQuery === "" && (
        <section className="py-5 bg-[#F5F7FB]">
          <div className="flex justify-center items-center">
            <div className=" container mx-auto md:px-4 text-center px-2">
              <h1 className="text-black md:mt-12 text-2xl text-start">
                Recent Articles
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                <>
                  {recentArticles.slice(0, 1).map((item, index) => (
                    <Link key={index} to={`/blogdetail/${item.slug}`}>
                      <div className="flex flex-col shadow-lg bg-white p-4 h-full">
                        <img
                          src={`https://admin.gamern.xyz${item.cover.formats.medium.url}`}
                          alt={item.title}
                          className="lg:w-full lg:h-[25rem] md:h-[20rem] object-cover mb-3 shadow-lg"
                          loading="lazy"
                        />

                        <div className="mb-1 text-start pt-2">
                          <h1 className="text-lg font-bold mb-2 text-black">
                            {item.title}
                          </h1>
                          <p className="text-sm text-gray-600 mt-2 text-start">
                            {item.content?.length > 130 ? (
                              <>
                                {item.content.slice(0, 130)}
                                <span className="text-blue-500 font-black ml-1">
                                  .....
                                </span>
                              </>
                            ) : (
                              item.content
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="flex flex-col lg:space-y-5 md:space-y-2">
                    {recentArticles.slice(1, 4).map((item, index) => (
                      <Link
                        key={index}
                        to={`/article/${item.slug}`}
                        className="shadow-lg bg-white p-4"
                      >
                        <div className="text-start ">
                          <img
                            src={`https://admin.gamern.xyz${item.cover.formats.medium.url}`}
                            alt={item.title}
                            className="lg:w-[12rem] lg:h-[10rem] md:w-[7rem] md:h-[7rem] sm:w-16 h-28 object-cover shadow-lg float-left mr-2 mb-1"
                            loading="lazy"
                          />

                          <h1 className="text-sm md:text-base font-bold lg:mb-2 mb-0 text-black ">
                            {item.title}
                          </h1>
                          <p className="text-sm text-gray-600 mt-2 text-start">
                            {item.content?.length > 130 ? (
                              <>
                                {item.content.slice(0, 130)}
                                <span className="text-blue-500 font-black ml-1">
                                  .....
                                </span>
                              </>
                            ) : (
                              item.content
                            )}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="container-fluid">
        <Card showAll={true} searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default Blog;
