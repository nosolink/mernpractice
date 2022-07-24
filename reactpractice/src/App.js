import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";

function App() {
    const [numbers, setNumbers] = React.useState({n1: 0, n2: 0});
    const [answer, setAnswer] = React.useState({result: 0});

    useEffect(() => {
        console.log("Api called")
        fetchApi()
    }, [numbers])

    const fetchApi = async () => {
        fetch('http://localhost:8080/add?n1=' + numbers.n1 + "&n2=" + numbers.n2)
            .then(response => response.json())
            .then(data => setAnswer(data));
    }

    const changeFirst = (event) => {
        console.log(event.target.value);
        setNumbers({n1: parseInt(event.target.value), n2: numbers.n2});
    }

    const changeSecond = (event) => {
        console.log(event.target.value);
        setNumbers({n1: numbers.n1, n2: parseInt(event.target.value)});
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Choose two numbers to add:
                </p>
                n1: <input id="n1" type={"number"} onChange={changeFirst}></input>
                n2: <input id="n2" type={"number"} onChange={changeSecond}></input>
                <br/>
                <h2 className={"result"}>Result: {answer.result}</h2>
            </header>
        </div>
    );
}

export default App;
