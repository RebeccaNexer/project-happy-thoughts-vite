import { useEffect, useState } from "react";

export const Thoughts = ({ handleTweet, fetchTweets }) => {
    const [newTweet, setNewTweet] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [minLengthError, setMinLengthError] = useState("");
    const max = 140;
    const maxTweetLength = newTweet.length > max;
    const minTweetLength = newTweet.length < 5;

    const handleUpdate = (event) => {
        const message = event.target.value;
        setNewTweet(message);
        setMinLengthError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
        if (minTweetLength) {
            setMinLengthError("Minimun 5 characters");
        } else {
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ message: newTweet }),
                    headers: { "Content-Type": "application/json" },
                };
                const response = await fetch(postUrl, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                handleTweet(data);
                fetchTweets();
                setNewTweet("");
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    useEffect(() => {
        setErrorStatus(maxTweetLength ? true : false);
    }, [newTweet]);

    return (
        <div className="container">
           <h2>What is making you happy right now?</h2>
            <form><textarea rows="3" placeholder="'It is only in sorrow bad weather masters us; in joy we face the storm and defy it.' —Amelia Barr"
            onChange={handleUpdate}
            value={newTweet}>
                </textarea>
                {minLengthError && <p className="error-text">{minLengthError}</p>}
                    {errorStatus && <p className="error-text">Max {max} characters</p>}
                    <p className="length">{newTweet.length}/{max}</p>
                <button type="submit" id="submit" aria-label="button for tweeting"
                onClick={handleSubmit}
                disabled={maxTweetLength}>
                    <span aria-label="heart emoji">❤️</span> Send Happy Thought <span aria-label="heart emoji">❤️</span>
                    </button>
                </form>
        </div>
    );
};