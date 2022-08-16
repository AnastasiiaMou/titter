import {Link} from "react-router-dom";
import Likes from "./likes.component";

function Tweet({tweet}) {
    return (<div className="card mb-4" key={tweet.id}>
        <div className="card-body">
            <h6 className="card-subtitle ">
                <span> <Link className="card-link" to={"/feed/" + tweet.User.username}>@{tweet.User.username}</Link>  </span>
                <span className="p-2 text-muted">{new Date(tweet.timestamp).toLocaleString()  }</span>
            </h6>

            <p className="card-text">{tweet.text}</p>
            <Likes tweet={tweet}/>
        </div>

    </div>);
}

export default Tweet