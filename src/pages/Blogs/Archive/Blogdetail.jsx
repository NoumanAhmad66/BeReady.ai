import React from 'react'
import { API } from '../../../Hooks/config';
import useFetchBlogs from '../../../Hooks/useFetchBlogs';
import Card from '../../../components/Blogcard/Card';
import { FaUserEdit } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci"; 
import { useParams } from 'react-router-dom';
import "./Blogdetail.css"
import { Link } from 'react-router-dom';
import logo from "../../../assets/card/hero-card/img1.jpg"
import ReactMarkdown from "react-markdown";

const Blogdetail = () => {
    const { slug } = useParams(); // Get the blog ID from the route

    const { blogs, loading} = useFetchBlogs(
     `${API.BEREADY}articles?populate=*`
    );
  
  
    // Wait until blogs are loaded
    if (loading) {
      return <div className="justify-center items-center flex h-screen">
       Loading ................
      </div>;
     // Display loading message or spinner
    }
  
    // Find the blog based on slug after blogs are loaded
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) {
      return <p className="text-black">Blog not found!</p>;
    }
    
    // Filter related posts based on the category
    const relatedPosts = blogs.filter(
      (b) => b.slug !== blog.slug && b.article_category.name === blog.article_category.name
    );
    
// Function to get the last 7 articles
 const getRecentArticles = (blogs) => {
    return blogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)) // Sort by publishDate (descending)
      .slice(1, 5); // Get the last 7 articles
  };
  
  
  
  
  
    const recentArticles = blogs && blogs.length > 0 ? getRecentArticles(blogs) : [];
    const noRelatedBlogs = !relatedPosts || relatedPosts.length === 0;
  
  return (
    <>
    <div className="main">
        {/* Blog: title , author name , publish date  */}
    <section>
        <div className="container-fluid use-case-div-sm ">
          <div className="row">
          <div className="col-12 overlay-text-blog">
            <h2 className='mb-1'>{blog.title}</h2>
            <p className=' m-0 text-start letter-spacing'>
             {blog.metaDescription}
            </p>
            <div className='d-flex gap-3 mt-2'>
            <div className='d-flex gap-1  justify-content-center align-items-center'>
            <FaUserEdit className='icon'/>
            <h6  className='mb-0'>{blog.author.name}</h6>      
            </div >    
            <div className='d-flex gap-1 justify-content-center align-items-center'>
            <BiSolidCategory className='icon'/>
            <h6 className='mb-0'>{blog.article_category.name}</h6>
            </div>
             <div className='d-flex gap-1 justify-content-center align-items-center'>
             <CiCalendarDate className='icon' />
             <h6 className='mb-0'>{new Date(blog.publishedAt).toLocaleDateString()}</h6>
             </div>
              
            
          </div>
          </div>
          </div>
         
        </div>
    </section>
    {/* Blog detail */}
    <section>
    <div className="container-fluid mt-5">
          {/* Main Content */}
          <div className='row'>
          <div className="col-md-8 col-12">
            {/* Blog Image */}
            
            <img
            src={logo}
            //   src={`https://admin.gamern.xyz${blog.cover.formats.medium.url}`}
              alt={blog.title}
              className="img-fluid rounded image-full col-md-6 float-md-start mb-3 me-md-3"
              loading="lazy"
            />
          
           
            {/* Blog Description */}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Sidebar Recent Articles*/}
          <div className="col-md-4 col-12">
            <div className='overlay-text-blog'>
            <h2>Recent Articles</h2>
            <ul className="space-y-5">
            {recentArticles.map((item) => (
                <li key={item.id} className='links'>
                  <Link
                    to={`/article/${item.slug}`}
                    className="recent-link"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          </div>
          </div>
        </div>
    </section>
        
   
    {/* Related Posts */}
    <section className="bg-[#F5F7FB] flex flex-col px-3">
     <div className="container mx-auto px-4 text-center">
          <h1 className="mt-10 text-2xl text-black mb-0">Related Posts</h1>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="bg-gradient-to-r from-[#2f8f02] via-green-400 to-[#0e23e3] h-[7px] w-[7px]  rounded-full"></div>
            <div className="bg-gradient-to-r from-[#2f8f02] to-[#0e23e3] h-[2px] w-[5rem] "></div>
            <div className="bg-gradient-to-r from-[#2f8f02] via-green-400 to-[#0e23e3] h-[8.5px] w-[8.5px]  rounded-full"></div>
          </div>
        </div>
        {noRelatedBlogs ? (
                  <div className="text-center text-gray-600 my-5">
                    No related blog posts available.
                  </div>
                ) : (
                  <div className="pb-6"> 
                    <Card showRelated={true} relatedBlogs={relatedPosts}/>
                  </div>
        
      )}
    </section>
     </div>
    </>
  )
}

export default Blogdetail