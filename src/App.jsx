import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [meme, setMeme] = useState({
    author: "",
    title: "",
    imgUrl: "",
    postLink: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadingFailed, setImageLoadingFailed] = useState(false);

  const fetchMeme = async () => {
    let subreddits = ["programmerhumor", "wholesomememes"];
    let base_url = "https://meme-api.com/gimme/";

    let random_subreddit =
      subreddits[Math.floor(Math.random() * subreddits.length)];

    // Reset states for new image
    setImageLoaded(false);
    setImageLoadingFailed(false);
    setIsLoading(true);

    try {
      const response = await fetch(base_url + random_subreddit);
      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }

      const data = await response.json();
      setMeme({
        author: data.author,
        title: data.title,
        imgUrl: data.url,
        postLink: data.postLink,
      });

      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div className="App">
      <h3>Title: {meme.title}</h3>
      <div id="img-container">
        <img
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoadingFailed(true)}
          src={meme.imgUrl}
          alt={meme.title}
        />
        {imageLoadingFailed && <p>Image Failed to Load</p>}
      </div>
      <p>Author: {meme.author}</p>
      <p>
        Post Link: <a href={meme.postLink}>{meme.postLink}</a>
      </p>
      <button
        style={{
          backgroundColor: isLoading ? "rgb(101, 4, 157)" : "#830dc7",
        }}
        onClick={fetchMeme}
      >
        {/* let's not disable the button, its not fun here */}
        {isLoading || !imageLoaded ? "Loading..." : "Next meme"}
      </button>
      {!isSuccess && (
        <p>Error while loading the meme. Try checking your connection</p>
      )}
    </div>
  );
};

export default App;
