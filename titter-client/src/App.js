import {Route, Routes} from "react-router-dom";
import FeedPage from "./pages/feed.page";
import LoginPage from "./pages/login.page";
import MyFeedPage from "./pages/my-feed.page";
import MainPage from "./pages/main.page";
import Layout from "./components/layout.component";

function App() {
  return (
      <Routes>
          <Route path="/" exact element={<MainPage/>}/>
          <Route path="/me" element={<Layout><MyFeedPage/></Layout>}/>
          <Route path="/feed/:username" element={<Layout><FeedPage/></Layout>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="*" element={<p>not found</p>}/>
      </Routes>
  );
}



export default App;
