import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tree from "../components/tree/Tree";
import { getCommentByPostId } from "../store/commentSlice";
import { getPostById } from "../store/postSlice";

const BlogDetailsPage = () => {
  // redux
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const { post } = useSelector((state) => state.post);
  // local
  const [state, setState] = useState({ name: "", content: null });
  const { id } = useParams();
  // methods
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!state.name) {
      alert("Name must not be empty");
      return;
    }

    if (!state.content) {
      alert("Content must not be empty");
      return;
    }

    axios
      .post("http://localhost:3000/comment/", { ...state, postId: id })
      .then((res) => {
        dispatch(getCommentByPostId(id));
      });
  };

  useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getCommentByPostId(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          {/* post */}
          <div className="flex px-5 pt-16 items-center justify-center flex-col">
            <div className="text-centerr lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {post.title}
              </h1>
              <p className="mb-8 leading-relaxed">{post.content}</p>
            </div>
          </div>

          {/* comment form */}
          <div className="lg:w-2/3 w-full mx-auto mb-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  name="name"
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
                  placeholder="name"
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
          {/* comment */}
          <div className="mx-auto lg:w-2/3 w-full">
            {comments && <Tree treeData={comments} postId={id} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
