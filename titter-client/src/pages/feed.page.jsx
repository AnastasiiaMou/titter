import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Tweet from "../components/tweet.component";

function FeedPage(props) {
    const {username} = useParams();
    const [feed, setFeed] = useState([])

    async function getFeed() {
        try {
            const feed = await axios.get(`/api/tweets/feed/${username}`)
            setFeed(feed.data);
        } catch (e) {
            alert(`Error ${e}`)
        }
    }

    useEffect(() => {
        getFeed()
    }, [username])

    return <div className="row justify-content-center">
        <div className="col-md-4">
            <h4 className="mb-5">@{username}</h4>
            {feed.map(tweet => <Tweet key={tweet.id} tweet={tweet}/>)}
        </div>

    </div>;
}

export default FeedPage