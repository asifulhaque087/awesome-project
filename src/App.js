import { useEffect, useState } from "react";
import "./App.css";

const nestedTreeData = [
  { id: 1, name: "Bob", text: "Fruits", date: "17 feb", parentId: 0 },
  { id: 2, name: "Alice", text: "to Bob", date: "17 feb", parentId: 1 },
  { id: 3, name: "Bob", text: "to Alice", date: "17 feb", parentId: 2 },
  { id: 3, name: "Tom", text: "Cities", date: "17 feb", parentId: 0 },
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
        className="row"
        onClick={() => {
          console.log("clicked");
          setIsCollapsed(!isCollapsed);
        }}
        style={{
          marginLeft: `${level * 10}px`,
        }}
      >
        {/* avatar  */}
        <div className="avatar">
          

        </div>

        <div>
          <span className="">{item.text}</span>
        </div>
      </div>

      {/* children */}
      <div className={`children ${isCollapsed && "collapsed"}`}>{children}</div>
    </div>
  );
}

export function Tree({ treeData, parentId = 0, level = 0 }) {
  const items = treeData
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => (a.text > b.text ? 1 : -1));

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
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    setTreeData(getTreeData());
  }, []);

  return <div>{treeData && <Tree treeData={treeData} />}</div>;
}

export default App;
