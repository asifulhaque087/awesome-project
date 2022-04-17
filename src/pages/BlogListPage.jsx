import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogListPage = () => {
  const [state, setState] = useState({ title: "", content: null });
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!state.title) {
      alert("Title must not be empty");
      return;
    }

    if (!state.content) {
      alert("Content must not be empty");
      return;
    }

    axios.post("http://localhost:3000/post/", state).then((res) => {
      fetchPosts();
    });
  };
  const fetchPosts = () => {
    axios.get("http://localhost:3000/post/", state).then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {/* new post button */}
          <button
            onClick={() => setModal(true)}
            className="my-10 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            New Post
          </button>
          {/* modal */}
          {modal && (
            <>
              {/* backdrop */}
              <div
                onClick={() => setModal(false)}
                className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-80"
              />
              <div className="fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full max-w-md">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                  {/* Modal content */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                        Add a new post
                      </h3>
                      <button
                        onClick={() => setModal(false)}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            name="title"
                            onChange={handleChange}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
                            placeholder="title"
                          />
                        </div>
                        <div>
                          <textarea
                            name="content"
                            onChange={handleChange}
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
                            placeholder="Content..."
                            defaultValue={""}
                          />
                        </div>
                        <div>
                          <button
                            className="my-2 block text-white bg-indigo-500 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* Modal footer */}
                    {/* <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => setModal(false)}
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Decline
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-wrap -m-4">
            {/* 1st */}
            {posts &&
              posts.map((post) => (
                <div key={post._id} className="p-4 lg:w-1/3">
                  <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {post.createdAt}
                    </h2>
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {post.title}
                    </h1>
                    <p className="leading-relaxed mb-3">
                      {post.content}
                    </p>
                    <Link
                      to="/blogs/1"
                      className="text-indigo-500 inline-flex items-center"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx={12} cy={12} r={3} />
                        </svg>
                        1.2K
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                        6
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;
