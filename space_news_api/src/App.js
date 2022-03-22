import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [news, setNews] = useState([])

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v3/articles/")
      .then(response => response.json())
      .then(data => setNews(data))
    
  })
	// https://api.spaceflightnewsapi.net/v3/articles/
	return (
		<div className="App">
			<div className="title">
				<h1>Space News</h1>
      </div>
      <hr/>
      <div className="newsContainer"> 
        {
          news.map((val, key) => {
           return (
							<div key={key} className="articles">
								<h3 onClick={() => (window.location.href = val.url)}>
									{val.title}
								</h3>
								<h6>{val.publishedAt}</h6>
								<img
									className="newsImg"
									src={val.imageUrl}
									alt="related to the news"
								/>
								<p>
									{val.summary}
									<a href={val.url} target="_blank">
										<b>Read more</b>
									</a>
								</p>
							</div>
						);
          })
        }
      </div>
		</div>
	);
}

export default App;
