import {useEffect, useState} from "react";
import axios from "axios";
import Tweet from "../components/tweet.component";

function MyFeedPage(props) {
    const [feed, setFeed] = useState([])
    const [tweet, setTweet] = useState("")
    async function getMyFeed() {
        try {
            const res = await axios.get('/api/tweets/my', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })

            setFeed(res.data);
        } catch (e) {
        }
    }

    async function sendTweet() {
        try {
            await axios.post('/api/tweets', {text: tweet}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            setTweet("");
            await getMyFeed()
        } catch (e) {
            alert("Error!")
        }
    }

    useEffect(() => {
        getMyFeed()
    }, [])

    return <div className="row justify-content-center">
        <div className="col-md-4">
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">New tweet</label>
                <textarea maxLength={140} className="form-control" id="exampleFormControlTextarea1" rows="3" value={tweet} onChange={e => setTweet(e.target.value)}></textarea>
                <span className="form-text">{tweet.length}/140</span>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={sendTweet}>Tweet!</button>
            </div>
            {feed.map(tweet => <Tweet key={tweet.id} tweet={tweet}/> )}
        </div>

    </div>
}

export default MyFeedPage