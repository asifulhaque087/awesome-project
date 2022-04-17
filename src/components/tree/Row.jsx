import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCommentByPostId } from "../../store/commentSlice";

const Row = ({ item, level, children, postId }) => {
  // redux
  const dispatch = useDispatch();
  // local
  const [state, setState] = useState({ name: "", content: null });
  const [isCollapsed, setIsCollapsed] = useState(true);

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
      .post("http://localhost:3000/comment/", {
        ...state,
        parentId: item._id,
        postId,
      })
      .then((res) => {
        dispatch(getCommentByPostId(postId));
        setIsCollapsed(true);
      });
  };
  return (
    <div key={`section-${item._id}`}>
      <div
        className="flex flex-col gap-3 mb-3 border rounded p-4"
        // onClick={() => {
        //   setIsCollapsed(!isCollapsed);
        // }}
        style={{
          marginLeft: `${level * 20}px`,
        }}
      >
        {/* avatar  */}
        <div className="flex items-center gap-2">
          {/* image */}
          <div>
            <img className="rounded-full" width={30} src={item.image} alt="" />
          </div>
          {/* content */}

          <div className="">
            <p className="text-blue-500 font-medium text-base">{item.name}</p>
            <p className="text-xs">{item.createdAt}</p>
          </div>
        </div>

        {/* message */}
        <div>
          <span className="">{item.content}</span>
        </div>
        {/*  */}
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="text-blue-500 opacity-80"
          >
            reply
          </button>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className={`${isCollapsed && "hidden"}`}
          >
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
      </div>

      {/* children */}
      {/* <div className={`children ${isCollapsed && "collapsed"}`}>{children}</div> */}
      <div className={`children`}>{children}</div>
    </div>
  );
};

export default Row;
