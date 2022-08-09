function Tweet({tweet}) {
    return (<div className="card mb-4" key={tweet.id}>
        <div className="card-body">
            <h6 className="card-subtitle ">
                <span>@{tweet.User.username}</span>
                <span className="p-2 text-muted">{new Date(tweet.timestamp).toLocaleString()  }</span>
            </h6>

            <p className="card-text">{tweet.text}</p>
        </div>

    </div>);
}

export default Tweet