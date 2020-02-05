import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [dogPic, setDogPic] = useState("");

  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("dogs");

  const [position, setPosition] = useState({ x: 0, y: 0 });

  //====== Dog Pictures ======
  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then(response => {
        console.log(response);
        setDogPic(response.data.message);
      })
      .catch(error => console.log(error));
  }, []);

  //====== Searchbar ======
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://hn.algolia.com/api/v1/search?query=" + query)
        .then(response => setData(response.data));
    };

    fetchData();
  }, [query]);

  //====== Mouse over tracker ======
  useEffect(() => {
    function setFromEvent(event) {
      setPosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return (
    <div className="App">
      <h1>Dogs Rule</h1>
      <img src={dogPic} alt="A random dog" />
      <input value={query} onChange={event => setQuery(event.target.value)} />
      <ul>
        {data.hits.map(element => (
          <li>
            <a href={element.url}>{element.title}</a>
          </li>
        ))}
      </ul>
      <div>
        {position.x}:{position.y}
      </div>
    </div>
  );
}

export default App;
