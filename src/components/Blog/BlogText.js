import React from "react";
import "./BlogText.css";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import blogData from "../../Data/blogs";
import RelatedPosts from "./RelatedPosts";
function BlogText() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  console.log(id);
  const post = blogData.find((post) => post.id === parseInt(id)); // Find the corresponding blog post

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <div className="body">
        <div className="blog-text">
          <div className="container-lg">
            <div className="row">
              <div key={post.id} className="col-lg-8">
                <div className="card-body">
                  <h3 className="card-title ">{post.title}</h3>
                </div>
                <img src={post.image} alt="" className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">{post.text}</p>
                </div>
              </div>
              <div className="col-lg-4">
                <RelatedPosts/>
              </div>
            </div>
            <div className="about-author-container">
              <h3>About Author</h3>
              <div className="about-author d-flex p-4 bg-light">
                <div className="bio">
                  <img
                    src="https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708300800&semt=ais"
                    alt="Image placeholder"
                    className="img-fluid mb-4"
                  />
                </div>
                <div className="desc">
                  <h3>Mr. Yogesh Kadam</h3>
                  <p>Diabetologist </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ducimus itaque, autem necessitatibus voluptate quod mollitia
                    delectus aut, sunt placeat nam vero culpa sapiente
                    consectetur similique, inventore eos fugit cupiditate
                    numquam!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogText; // Export the BlogText component
