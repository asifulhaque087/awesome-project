import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tree from "../components/tree/Tree";

// const nestedTreeData = [
//   {
//     _id: 1,
//     name: "Bob",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
//     image:
//       "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
//     date: "17 feb",
//     parentId: 0,
//   },
//   {
//     _id: 2,
//     name: "Alice",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
//     image: "https://www.w3schools.com/howto/img_avatar2.png",
//     date: "17 feb",
//     parentId: 1,
//   },
//   {
//     _id: 3,
//     name: "Bob",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",

//     image:
//       "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
//     date: "17 feb",
//     parentId: 2,
//   },
//   {
//     _id: 3,
//     name: "Tom",
//     text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
//     image:
//       "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
//     date: "17 feb",
//     parentId: 0,
//   },
// ];

export function getTreeData(nestedTreeData) {
  return nestedTreeData.map((item) => ({
    ...item,
    hasChildren:
      nestedTreeData.filter((i) => i.parentId === item._id).length > 0,
  }));
}

const BlogDetailsPage = () => {
  const [state, setState] = useState({ name: "", content: null });
  const [treeData, setTreeData] = useState([]);
  const [post, setPost] = useState({});
  const { id } = useParams();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!state.name) {
      alert("Title must not be empty");
      return;
    }

    if (!state.content) {
      alert("Content must not be empty");
      return;
    }

    axios
      .post("http://localhost:3000/comment/", { ...state, postId: id })
      .then((res) => {
        fetchComments(id);
      });

  };

  const fetchPost = (id) => {
    axios.get(`http://localhost:3000/post/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  const fetchComments = (postId) => {
    axios.get(`http://localhost:3000/comment/${postId}`).then((res) => {
      let track = {};

      let newData = res.data.map((item, i) => {
        if (!item.parentId) {
          item["parentId"] = 0;
        }

        if (track[item.name.trim()]) {
          console.log("name exits");
          item["image"] = track[item.name.trim()];
        } else {
          console.log("does not exits");
          let img = `https://robohash.org/${i + 10}?size=200x200`;
          item["image"] = img;
          track[item.name.trim()] = img;
        }

        return item;
      });
      setTreeData(getTreeData(newData));
    });
  };

  useEffect(() => {
    fetchPost(id);
    fetchComments(id);
  }, []);

  // return <div className="m-52">{treeData && <Tree treeData={treeData} />}</div>;
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
            {treeData && <Tree treeData={treeData} postId={id} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
