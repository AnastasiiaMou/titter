import {useEffect, useState} from "react";
import axios from "axios";
import Tweet from "../components/tweet.component";
import {Link} from "react-router-dom";

function MainPage() {
    const [feed, setFeed] = useState([])

    async function getFeed() {
        try {
            const feed = await axios.get(`/api/tweets/top3`)
            setFeed(feed.data);
        } catch (e) {
            alert(`Error ${e}`)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])
    return <div className="container-md">
        <div className="row mt-5">
            <div className="col-md-6">
                <h1>Hello from Titter!</h1>
                <p><Link to="/login">Login or sign up</Link></p>
            </div>
            <div className="col-md-6">
                {feed.map(
                    tweet => <Tweet tweet={tweet} key={tweet.id}/>
                )}
            </div>
        </div>


    </div>
}

export default MainPage