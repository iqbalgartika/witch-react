import React, { useState } from 'react';
import Header from './Header';
import Villager from './Villager';
import Footer from './Footer';

function App() {
    const [villagers, setVillagers] = useState([{ yearofdeath : 0, ageofdeath: 0 }]);
    const [result, setResult] = useState(0);

    function addVillager() {
        setVillagers(prevVillagers => {
            return [...prevVillagers, { yearofdeath : 0, ageofdeath: 0 }]
        })
    }

    function deleteVillager(id) {
        setVillagers(prevVillagers => {
            return prevVillagers.filter((villager, idx) => {
                return idx !== id;
            })
        })
    }

    function updateVillager(event, id) {
        const villager = {...villagers[id]};
        villager[event.target.name] = +event.target.value;
        const updatedVillagers = [...villagers];
        updatedVillagers[id] = villager;
    
        setVillagers(updatedVillagers);
    }

    function banishTheWitch() {
        fetch('https://geekseat-witch.herokuapp.com/api/banishTheWitch', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(villagers)
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log(res);
                }
                return res.json();
            })
            .then(resData => {
                setResult(resData);
            })
    }

    return <div>
        <Header />
        <div>
            {villagers.map((vil, idx) => (
                <Villager 
                    key={idx}
                    id={idx}
                    yearofdeath={vil.yearofdeath}
                    ageofdeath={vil.ageofdeath}
                    onDelete={deleteVillager}
                    changed={(event) => updateVillager(event, idx)}
                />
            ))}
            <button className="button" onClick={addVillager}>Add Villager</button>

        </div>
        <br/>
        <div>
            <button className="button" onClick={banishTheWitch}>Banish the Witch!</button>
            <h2>Result: {result}</h2>
        </div>
        <Footer />
    </div>;
}

export default App;