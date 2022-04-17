import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const nestedTreeData = [
  {
    id: 1,
    name: "Bob",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
    image:
      "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
    date: "17 feb",
    parentId: 0,
  },
  {
    id: 2,
    name: "Alice",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
    image: "https://www.w3schools.com/howto/img_avatar2.png",
    date: "17 feb",
    parentId: 1,
  },
  {
    id: 3,
    name: "Bob",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",

    image:
      "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=",
    date: "17 feb",
    parentId: 2,
  },
  {
    id: 3,
    name: "Tom",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla optio veritatis vel nobis velit saepe similique illo impedit dicta modi laudantium nam, quae incidunt nemo accusantium. Exercitationem, tempore. Voluptatibus?",
    image:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000",
    date: "17 feb",
    parentId: 0,
  },
];

export function getTreeData() {
  return nestedTreeData.map((item) => ({
    ...item,
    hasChildren:
      nestedTreeData.filter((i) => i.parentId === item.id).length > 0,
  }));
}

export function Row({ item, level, children }) {
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
      alert("Title must not be empty");
      return;
    }

    if (!state.content) {
      alert("Content must not be empty");
      return;
    }
    console.log("parent id is ", item.id);

    console.log("submitting", state);
  };
  return (
    <div key={`section-${item.id}`}>
      <div
        className="flex flex-col gap-3 mb-3 border rounded p-4"
        // onClick={() => {
        //   setIsCollapsed(!isCollapsed);
        // }}
        style={{
          marginLeft: `${level * 10}px`,
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
            <p className="text-xs">{item.date}</p>
          </div>
        </div>

        {/* message */}
        <div>
          <span className="">{item.text}</span>
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
      </div>

      {/* children */}
      {/* <div className={`children ${isCollapsed && "collapsed"}`}>{children}</div> */}
      <div className={`children`}>{children}</div>
    </div>
  );
}

export function Tree({ treeData, parentId = 0, level = 0 }) {
  const items = treeData.filter((item) => item.parentId === parentId);
  // .sort((a, b) => (a.text > b.text ? 1 : -1));

  if (!items.length) return null;

  return (
    <>
      {items &&
        items.map((item) => (
          <Row key={item.id} item={item} level={level}>
            <Tree treeData={treeData} parentId={item.id} level={level + 1} />
          </Row>
        ))}
    </>
  );
}

const BlogDetailsPage = () => {
  // const { id } = useParams();

  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    setTreeData(getTreeData());
  }, []);

  // return <div className="m-52">{treeData && <Tree treeData={treeData} />}</div>;
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          {/* post */}
          <div className="flex px-5 py-24 items-center justify-center flex-col">
            <div className="text-centerr lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Microdosing synth tattooed vexillologist
              </h1>
              <p className="mb-8 leading-relaxed">
                Meggings kinfolk echo park stumptown DIY, kale chips beard
                jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice
                godard disrupt ramps hexagon mustache umami snackwave tilde
                chillwave ugh. Pour-over meditation PBR&amp;B pickled ennui
                celiac mlkshk freegan photo booth af fingerstache pitchfork.
              </p>
            </div>
          </div>
          {/* comment */}
          <div className="mx-auto lg:w-2/3 w-full">
            {treeData && <Tree treeData={treeData} />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
