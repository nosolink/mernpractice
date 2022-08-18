import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";
import {Card, Pane} from "evergreen-ui";

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

    const [name, setName] = React.useState("Enter a Name!");
    const [key, setKey] = React.useState("key");
    const [character, setCharacter] = React.useState(
        {
            name: name,
            level: 10,
            currHp: 100,
            key: key,
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
            },
            weapon: {
                name: "Weapon",
                stats: {
                    atk: Math.floor(Math.random() * 10),
                    def: Math.floor(Math.random() * 10)
                }
            }
        }
    );

    useEffect(() => {
        console.log("Api called")
        fetchApi()
    }, [])

    const fetchApi = async () => {
        fetch('http://localhost:8080/newCharacter?name=' + name + "&key=" + key)
            .then(response => response.json())
            .then(data => setCharacter(data));
    }

    const changeName = (event) => {
        console.log(event.target.value);
        setName(event.target.value);
    }

    const changeKey = (event) => {
        console.log(event.target.value);
        setKey(event.target.value);
    }

    const PrettyPrintStats = (props) => {
        let stats = props.stats.stats;
        return (
            props.stats.error ? "Invalid Key" :
                <div className={"Test"}>
                    <p>HP: {stats.maxHp + "\n"}</p>
                    <div className={"hp-bar"} style={{width: stats.maxHp/200 * 100}}/>
                    <p>ATK: {stats.atk + "\n"}</p>
                    <div className={"atk-bar"} style={{width: stats.atk/20 * 100}}/>
                    <p>DEF: {stats.def + "\n"}</p>
                    <div className={"def-bar"} style={{width: stats.def/20 * 100}}/>
                    <p>SPD: {stats.spd + "\n"}</p>
                    <div className={"spd-bar"} style={{width: stats.spd/20 * 100}}/>
                    <p>EVA: {stats.eva + "\n"}</p>
                    <div className={"eva-bar"} style={{width: stats.eva/20 * 100}}/>
                </div>
        )
    }

    const WeaponStats = (props) => {
        let weapon = props.weapon.weapon

        return (
            props.weapon.err ? "" : <div className={"Test"} style={{marginTop: "15px"}}>
                <p><strong>Weapon:</strong> {weapon.name}</p>
                <p>ATK: {weapon.stats.atk}</p>
                <div className={"atk-bar"} style={{width: weapon.stats.atk/10 * 100}}/>
                <p>DEF: {weapon.stats.def}</p>
                <div className={"def-bar"} style={{width: weapon.stats.def/10 * 100}}/>
            </div>
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>Generate a Character</h3>
                <p>
                    <strong>Name:</strong> <input id="n1" type={"text"} onChange={changeName} className={"Input"}></input>
                </p>
                <p>
                    <strong>Key:</strong> <input id="n1" type={"text"} onChange={changeKey} className={"Input"}></input>
                </p>
                <button onClick={fetchApi} className={"submitButton"}>Submit</button>

                <br/>
                {
                    (character !== {}) ?
                        <div>
                            <p className={"result"}>Name: {character.name}</p>
                            <div className={"divider"}/>
                            <PrettyPrintStats stats={character}/>
                            <WeaponStats weapon={character}/>
                        </div>
                        : "Loading"
                }
            </header>
        </div>
    );
}

export default App;
