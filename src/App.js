import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
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
  // { id: 4, text: "Citrus", parentId: 1 },
  // { id: 5, text: "Stone fruits", parentId: 1 },
  // { id: 6, text: "Berries", parentId: 1 },
  // { id: 7, text: "Orange", parentId: 4 },
  // { id: 8, text: "Grapefruit", parentId: 4 },
  // { id: 9, text: "Lime", parentId: 4 },
  // { id: 10, text: "Nectarine", parentId: 5 },
  // { id: 11, text: "Apricot", parentId: 5 },
  // { id: 12, text: "Peach", parentId: 5 },
  // { id: 13, text: "Strawberry", parentId: 6 },
  // { id: 14, text: "Raspberry", parentId: 6 },
  // { id: 15, text: "Blueberry", parentId: 6 },
  // { id: 16, text: "Darker", parentId: 2 },
  // { id: 17, text: "Lighter", parentId: 2 },
  // { id: 18, text: "MidnightBlue", parentId: 16 },
  // { id: 19, text: "ForestGreen", parentId: 16 },
  // { id: 20, text: "Maroon", parentId: 16 },
  // { id: 21, text: "SkyBlue", parentId: 17 },
  // { id: 22, text: "LightGray", parentId: 17 },
  // { id: 23, text: "Khaki", parentId: 17 },
  // { id: 24, text: "Europe", parentId: 3 },
  // { id: 25, text: "America", parentId: 3 },
  // { id: 26, text: "Asia", parentId: 3 },
  // { id: 27, text: "Rome", parentId: 24 },
  // { id: 28, text: "Berlin", parentId: 24 },
  // { id: 29, text: "Madrid", parentId: 24 },
  // { id: 30, text: "Beijing", parentId: 26 },
  // { id: 31, text: "Chengdu", parentId: 26 },
  // { id: 32, text: "Guangzhou", parentId: 26 },
  // { id: 33, text: "Houston", parentId: 25 },
  // { id: 34, text: "Los Angeles", parentId: 25 },
  // { id: 35, text: "New York", parentId: 25 },
];

export function getTreeData() {
  return nestedTreeData.map((item) => ({
    ...item,
    hasChildren:
      nestedTreeData.filter((i) => i.parentId === item.id).length > 0,
  }));
}

export function Row({ item, level, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
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
          <input
            className={`${
              isCollapsed && "hidden"
            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
          />
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

function App() {
  // const [treeData, setTreeData] = useState([]);
  // useEffect(() => {
  //   setTreeData(getTreeData());
  // }, []);

  // return <div className="m-52">{treeData && <Tree treeData={treeData} />}</div>;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/hello" element={<div>hola</div>} />
      </Routes>
    </div>
  );
}

export default App;
