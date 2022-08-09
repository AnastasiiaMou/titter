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

    return <div>
        {feed.map(tweet => <Tweet tweet={tweet}/>)}
    </div>;
}

export default FeedPage