import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [gameTitle, setGameTitle] = useState("")
  const [searchedGames, setSearchedGames] = useState([])
  const [deals, setDeals] = useState([])

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
			.then((response) => response.json())
			.then((data) => setSearchedGames(data));
  }

  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3")
      .then(response => response.json())
    .then(data => setDeals(data))
  }) 

  return (
		<div className="App">
			<div className="searchSection">
				<h1>Search for a Game</h1>
				<input
					type="text"
					placeholder="Ex: Minecraft"
					onChange={(event) => setGameTitle(event.target.value)}
				/>
				<button onClick={searchGame}>Search Game</button>
				<div className="gamesList">
					{searchedGames.map((game, key) => {
						return (
							<div key={key} className="games">
								{game.external}
								<img
									className="gameImg"
									src={game.thumb}
									alt="game thumbbnail"
								/>
								${game.cheapest}
							</div>
						);
					})}
				</div>
			</div>
			<div className="dealsSection">
				<h1>Latest Deals</h1>
				<div className="dealsList">
					{deals.map((deal, key) => {
            return (
							<div key={key}>
								<h3>{deal.title}</h3>
								<p>Normal price: {deal.normalPrice}</p>
								<p>Deal price: {deal.salePrice}</p>
								<h5>YOU SAVE: {deal.savings.slice(0, 2)}%</h5>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
