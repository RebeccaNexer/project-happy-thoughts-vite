import { useState, useEffect } from "react";

import { Thoughts } from './components/Thoughts';
import { Listning } from './components/Listning';

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const getUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  useEffect(() => {
      fetchTweets();
      const intervalId = setInterval(() => {
          fetchTweets();
      }, 1000);
      return () => clearInterval(intervalId);
  }, []);

  const handleTweet = (newTweet) => {
    setThoughts((thoughts) => [newTweet, ...thoughts]);
};

const fetchTweets = async () => {
    try {
        const response = await fetch(getUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setThoughts(jsonData);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  return <div className="main-container">
    <h1>Happy thoughts</h1>
      <Thoughts
      handleTweet={handleTweet}
      fetchTweets={fetchTweets}/>
      <Listning thoughts={thoughts}/>
</div>;
};
