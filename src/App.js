import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedDate) return;

    const page = 1;
    const pageSize = 30;
    setIsLoading(true);
    fetch(`https://mutinybayboatwatching.xyz/api/images?date=${selectedDate}&page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        setIsLoading(false);
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
  }, [selectedDate]);

  const getMainContent = () => {
    if(error) {
      return <p>{error}</p>
    }

    if(isLoading) {
      return <p>Loading images...</p>
    }

    if (images.length === 0) {
      return <p>No images for that date</p>
    }

    return (
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
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mutiny Bay Boat Watching</h1>

        <label style={{ marginBottom: "1rem" }}>
          <span style={{ marginRight: "0.5rem" }}>Select a date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>

        {getMainContent()}
      </header>
    </div>
  );
}

export default App;