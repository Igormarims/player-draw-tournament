import React, { useState,useEffect } from "react";
import "./App.css";
import img from'./assets/img/League-Of-Legends-Logo-Background-PNG.png';


type Players = {
  id: number,
  name: string,
  position?: string ;
}

function App() {
  const [players, setPlayers] = useState<Players[]>([]);
  const [name, setName] = useState("");
  const [team1, setTeam1] = useState<Players[]>([]);
  const [team2, setTeam2] = useState<Players[]>([]);
  const [drawTeams, setDrawTeams] = useState(false);
  const isDisabled = players.length % 2 !== 0 || players.length === 0;
  
  useEffect(() => {
    console.log(team1);
    console.log(team2);
  }, [team1, team2]);

  const addPlayer = () => {
    if (name) {
      setPlayers([...players, { id: players.length++, name}])
      setName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  const removePlayer = (id: number) => {
    setPlayers([...players.filter((player) => player.id !== id)]);
    setTeam1([...team1.filter((player) => player.id !== id)]);
    setTeam2([...team2.filter((player) => player.id !== id)]);
    
  };

  const handleDrawTeams = () => {
    const playerWithPositions: Players[] = players.map(player => ({
      ...player,
      position: undefined,
    })); 
    
    // embaralhar array de jogadores
    const shuffledPlayers = playerWithPositions.sort(() => 0.5 - Math.random());
  
    const team1Length = Math.ceil(shuffledPlayers.length / 2);
    const team1Players = shuffledPlayers.slice(0, team1Length);
    const team2Players = shuffledPlayers.slice(team1Length, shuffledPlayers.length);
   
    console.log(team1Players,'team1Players ');
    console.log(team2Players,'team2Players ');
    
   // Atribuir posição aleatória para cada jogador
    const positions = ["mid", "top", "jungle", "sup", "adc"];
    team1Players.forEach((player) => {
      const randomPositionIndex = Math.floor(Math.random() * positions.length);
      player.position = positions.splice(randomPositionIndex, 1)[0];
    });
    
    const positions2 = ["mid", "top", "jungle", "sup", "adc"];
    
    team2Players.forEach((player) => {
      const randomPositionIndex = Math.floor(Math.random() * positions2.length);
      player.position = positions2.splice(randomPositionIndex, 1)[0];
      console.log(player,'play');
      
    });

    setTeam1(team1Players);
    setTeam2(team2Players);
  
    setDrawTeams(true);
  };


  return (
    <div className="App">
      {/* Header */}
      <div className="container-header">
        {/* <h2>Sorteio de jogadores</h2> */}
        <img src={img} alt="Logo" />
      </div>
       <h4>
        número de jogadores {players.length }
       </h4>

      {/* Adicionar Jogadores */}

      <div className="players">
        <div className="container-add-players">
          <div className="input-players">
            <label className="label-add-players">
              Digite o nome dos jogadores
            </label>
           <div className="container-btn-input">
            <input
              className="input-add-player"
              type="text"
              value={name}
              onKeyDown={handleKeyDown}
              onChange={(e) => setName(e.target.value)}
            />
            <button 
               className="add-player-button"
               disabled={players.length === 10}
               onClick={addPlayer}>
              Adicionar
            </button>
            <button 
               className="add-player-button"
               disabled={isDisabled}
               onClick={handleDrawTeams}>
               Sortear
            </button>
          </div>
        </div>
          <div className="Players"></div>
        </div>

      <div className="container-players">
         { players.length > 0 &&
        <div className="selected-players">
          <ul className="list-player-ul">
            {players.map((player) => {
              return (
                <li key={player.id}>
                  {player.name}
                  <button
                    className="remove-player-button"
                    onClick={() => removePlayer(player.id)}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        }
     <div className="container-times">
        <div className="time1">
                  {drawTeams && team1.length > 0 && (
          <ul className="list-player-ul">
            <div className="titulo-time">
               <h1>TIME 1</h1>
               <div className="titule-roles">
                  <h3>Nomes</h3>
                   <h3>Rotas</h3>
               </div>
             
            </div>
            {team1.map((time1) => {
              return (
                <>
                <div className="content-time1">
                <li key={time1.id}>
                  {time1.name}
                </li>
                <span >
                  {time1.position}
                </span>
                {/* <br/> */}
                </div>
                </>
              );
            })}
          </ul>
        )}
      </div> 
      {drawTeams && team2.length > 0 &&
              <big>
                vs
              </big>
    }
      <div className="time2">
           {drawTeams && team2.length > 0 && (
          <ul className="list-player-ul">
               <div className="titulo-time">
               <h1>TIME 2</h1>
               <div className="titule-roles">
                  <h3>Nomes</h3>
                   <h3>Rotas</h3>
               </div>
            </div>
            {team2.map((time2) => {
              return (
                <>
                 <div className="content-time1">
                <li key={time2.id}>
                  {time2.name}
                </li>
                <span>
                  {time2.position}
                </span>
               </div>
                </>
              );
            })}
          </ul>
        )}
        </div>
      </div>
      </div>
    </div>

      {/* Jogadores sorteados */}


      {/* Times com ROLEs */}
    </div>
  );
}

export default App;
