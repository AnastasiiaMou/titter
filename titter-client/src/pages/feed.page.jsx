import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function FeedPage (props) {
    const { username } = useParams();
    const [ feed, setFeed ] = useState([])
    async function getFeed(name) {
        try {
            const feed = await axios.get(`/api/tweets/feed/${username}`)
            setFeed(feed.data);
        } catch (e) {
            alert(`Error ${e}`)
        }
    }
    useEffect( () => {
        getFeed()
    }, [username])

    return <div>
        {feed.map( tweet => <div key={tweet.id}>
            <p>{tweet.timestamp}</p>
            <p>{tweet.text}</p>
        </div>)}
    </div>
}

export default FeedPage