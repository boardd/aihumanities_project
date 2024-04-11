import React, {useState, useEffect} from 'react'

function App() {

    const [data, setData] = useState({
        members: [],
    });

    useEffect(() => {
        fetch("http://127.0.0.1:5000/members")
        .then(resp => resp.json())
        .then(data => {
            console.log('Response from backend: ', data);
            setData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            {(typeof data.members == 'undefined') ? (
                <p>Loading...</p>
            ) : (
                data.members.map((member,i) => (
                    <p key={i}>{member}</p>
                ))
            )}
        </div>
    );
}

export default App;