import axios from "axios";

function isLogged() {
    if (localStorage.getItem('token')) {
        return true
    }

    return false;
}

function Likes ({tweet}) {
    const logged = isLogged();

    async function likeTweet() {
        try {
            await axios.post(`/api/tweets/${tweet.id}/like`, {}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            alert('Tweet liked!')
        } catch (e) {
            alert('Error')
        }
    }

    return <>
        {logged ? (
            <>
                <button type="button" className="btn btn-primary btn-sm" onClick={likeTweet}>
                    Like <span className="badge text-bg-secondary"> {tweet.likes}</span>
                </button>
            </>
        ) : (
            <>
                <span className="badge bg-secondary">{tweet.likes} ❤</span>
            </>
        )}
    </>
}

export default Likes