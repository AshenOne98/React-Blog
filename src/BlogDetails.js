import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);
  const history = useHistory();

  const deleteBlog = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("Blog deleted");
      // history.go(-1)
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written b {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={deleteBlog}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
