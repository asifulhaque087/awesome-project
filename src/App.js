import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import BlogListPage from "./pages/BlogListPage";

function App() {

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
