

import { useState } from "react";
export const Tweet = ({tweet}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(tweet.hearts);
  const tweetId = tweet._id;
  const date = new Date(tweet.createdAt);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();

  const handleLike = async () => {
    try {
      const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tweetId }),
      };

      const response = await fetch(
          `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${tweetId}/like`,
          options
      );

      if (!response.ok) {
          throw new Error('Error liking tweet');
      }
      const data = await response.json();
      setLiked(true);
      setLikes(data.hearts);
  } catch (error) {
      console.error('Error:', error);
  }
};

    return (
        <div className="tweet-message" key={tweet._id}>
        <p className="tweet-heading">{tweet.message}</p>
            <div className="tweet-info">
                <span>
                <button className="heart-btn"
                        disabled={liked}
                        onClick={handleLike}>❤️</button> x {likes}</span>
                <span>{hour + 1}:{minute}</span>
            </div>
        </div>
        
    );
};