import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import BlogListPage from "./pages/BlogListPage";

function App() {
  // const [treeData, setTreeData] = useState([]);
  // useEffect(() => {
  //   setTreeData(getTreeData());
  // }, []);

  // return <div className="m-52">{treeData && <Tree treeData={treeData} />}</div>;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BlogListPage />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
