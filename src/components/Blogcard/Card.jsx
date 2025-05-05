import React from 'react'
import { API } from '../../Hooks/config';
import useFetchBlogs from '../../Hooks/useFetchBlogs';
import { Link } from 'react-router-dom';

const Card = ({  showAll, relatedBlogs,showRelated,searchQuery= "" }) => {
    
    const { blogs, loading, error } = useFetchBlogs(
        `${API.BEREADY}articles?populate=*`
       );
     
       const filterBlogs = (blogs) => {
         const normalize = (str) => (str ? str.toLowerCase().replace(/\s+/g, "") : ""); // Handle undefined or null strings
       
         const trimmedQuery = normalize(searchQuery.trim()); // Normalize the search query
       
         if (!trimmedQuery) return blogs; // If the trimmed query is empty, return all blogs
       
         return blogs.filter((blog) => {
           const titleMatch = normalize(blog.title).includes(trimmedQuery); // Normalize title and check
           const contentMatch = normalize(blog.content).includes(trimmedQuery); // Normalize content and check
           return titleMatch || contentMatch; // Match if either title or content contains the query
         });
       };
       
       
       // Determine which blogs to display based on the props
       const displayedBlogs = showAll
         ? filterBlogs(blogs) // Show all blogs if `showAll` is true
         : showRelated
         ? (relatedBlogs || blogs).slice(0, 5) // Show up to 5 related blogs
         : (relatedBlogs || blogs).slice(0, 3); // Show 3 blogs
     
       // Error and loading handling
       if (loading) {
         return <div className="justify-center items-center flex">
          loading .........
         </div>;
       }
     
       if (error) {
         return <h2 className="text-center text-red-500">{error}</h2>;
       }
     
       if (displayedBlogs.length === 0) {
         return <h2 className="text-center text-red-500">No blogs available</h2>;
       }

  return (
    <div className='container-fluid px-lg-4 px-md-4 px-sm-4 px-0   py-lg-5 py-md-4 py-sm-3 py-2 mb-1 '>
      <div className="row">
            {displayedBlogs.map((card, index) => (
              <div className="col-md-6 col-lg-4 mb-4 sm-screen " key={index}>
                <div className="card-wrapper">
                <div className="card-content">
                
                  <img
                     src={`https://admin.gamern.xyz${card.cover.formats.medium.url}`}
                     alt={card.title}
                    className=" img-fluid card-img"
                  />

                  <div className="card-top-content mt-2 mx-3 mb-4">
                    <h3 className="card-title"> {card.title?.length > 33 ? (
                          <>
                            {card.title.slice(0, 33)}
                            <span className="text-blue-500">...</span>
                          </>
                        ) : (
                          card.title
                        )}</h3>
                    <p className="card-dec ">{card.content?.length > 130 ? (
                          <>
                            {card.content.slice(0, 130)}
                            <span className="text-blue-500 font-black ml-1">
                              .....
                            </span>
                          </>
                        ) : (
                          card.content
                        )}</p>
                  </div>
                  <div className="mt-1 pb-4 mx-3">
                  <Link to={`/article/${card.slug}`} className="white-btn ">
                    
                  Read More Information
                    </Link>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Card