import {Route, Routes} from "react-router-dom";
import FeedPage from "./pages/feed.page";
import LoginPage from "./pages/login.page";
import MyFeedPage from "./pages/my-feed.page";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/feed/:username" element={<FeedPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/me" element={<MyFeedPage/>}/>
        <Route path="*" element={<p>not found</p>}/>
      </Routes>
    </div>
  );
}

export default App;
