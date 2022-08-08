import {Route, Routes} from "react-router-dom";
import FeedPage from "./pages/feed.page";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/feed/:username" element={<FeedPage/>}/>
        <Route path="*" element={<p>not found</p>}/>
      </Routes>
    </div>
  );
}

export default App;
