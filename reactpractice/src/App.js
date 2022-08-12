import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";

function App() {
    // const [numbers, setNumbers] = React.useState({n1: 0, n2: 0});
    // const [answer, setAnswer] = React.useState({result: 0});
    //
    // useEffect(() => {
    //     console.log("Api called")
    //     fetchApi()
    // }, [numbers])
    //
    // const fetchApi = async () => {
    //     fetch('http://localhost:8080/add?n1=' + numbers.n1 + "&n2=" + numbers.n2)
    //         .then(response => response.json())
    //         .then(data => setAnswer(data));
    // }
    //
    // const changeFirst = (event) => {
    //     console.log(event.target.value);
    //     setNumbers({n1: parseInt(event.target.value), n2: numbers.n2});
    // }
    //
    // const changeSecond = (event) => {
    //     console.log(event.target.value);
    //     setNumbers({n1: numbers.n1, n2: parseInt(event.target.value)});
    // }
    //
    // return (
    //     <div className="App">
    //         <header className="App-header">
    //             <img src={logo} className="App-logo" alt="logo"/>
    //             <p>
    //                 Choose two numbers to add:
    //             </p>
    //             n1: <input id="n1" type={"number"} onChange={changeFirst}></input>
    //             n2: <input id="n2" type={"number"} onChange={changeSecond}></input>
    //             <br/>
    //             <h2 className={"result"}>Result: {answer.result}</h2>
    //         </header>
    //     </div>
    // );

    const [name, setName] = React.useState("Name");
    const [character, setCharacter] = React.useState(
        {
            name: name,
            level: 10,
            currHp: 100,
            baseStats: {
                atk: Math.random() * 10,
                def: Math.random() * 10,
                spd: Math.random() * 10,
                eva: Math.random() * 10,
                maxHp: (Math.random() * 100) + 100,
            },
            growthRate: {
                atk: Math.random(),
                def: Math.random(),
                spd: Math.random(),
                eva: Math.random(),
                maxHp: Math.random(),
            },
            stats: {
                atk: 0,
                def: 0,
                spd: 0,
                eva: 0,
                maxHp: 0,
            }
        }
    );

    useEffect(() => {
        console.log("Api called")
        fetchApi()
    }, [])

    const fetchApi = async () => {
        fetch('http://localhost:8080/newCharacter?name=' + name)
            .then(response => response.json())
            .then(data => setCharacter(data));
    }

    const changeName = (event) => {
        console.log(event.target.value);
        setName(event.target.value);
    }

    const PrettyPrintStats = (props) => {
        let stats = props.stats;
        return (
            <div>
                <p>HP: {stats.maxHp + "\n"}</p>
                <p>ATK: {stats.atk + "\n"}</p>
                <p>DEF: {stats.def + "\n"}</p>
                <p>SPD: {stats.spd + "\n"}</p>
                <p>EVA: {stats.eva + "\n"}</p>
            </div>
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>Enter a character name and get stats -></p>
                name: <input id="n1" type={"text"} onChange={changeName}></input>
                <button onClick={fetchApi}>Submit</button>

                <br/>
                {
                    (character !== {}) ? <div>
                        <p className={"result"}>Name: {character.name}</p>
                        <PrettyPrintStats stats={character.stats}/>
                    </div> : "Loading"
                }
            </header>
        </div>
    );
}

export default App;
