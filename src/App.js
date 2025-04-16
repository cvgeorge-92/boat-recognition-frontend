import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const date = "2025-04-16"; // You can make this dynamic later
    const page = 1;
    const pageSize = 30;

    fetch(`https://mutinybayboatwatching.xyz/api/images?date=${date}&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setImages(data))
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError("Failed to load images");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mutiny Bay Boat Watching</h1>
        {error ? (
          <p>{error}</p>
        ) : images.length === 0 ? (
          <p>Loading images...</p>
        ) : (
          <div className="image-grid">
            {images.map((img) => (
              <div key={img.id} className="image-card">
                <a href={img.presignedUrl} target="_blank" rel="noopener noreferrer">
                  <img src={img.presignedUrl} alt={img.title || "Boat"} />
                </a>
                <p>{img.title}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;