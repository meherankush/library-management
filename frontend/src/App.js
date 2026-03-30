import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchBooks = async () => {
    try {
      if (!search) {
        fetchBooks();
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/books/search?q=${search}`
      );

      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBooks();
  }, []);

  // Auto search (debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      searchBooks();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* MAIN CONTENT */}
      <div style={{ flex: 1 }}>

        {/* HERO IMAGE SECTION */}
        <div
          style={{
            height: "280px",
           // backgroundImage: "url('/images/image2.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* DARK OVERLAY */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
            }}
          />

          {/* TEXT */}
          <div
            style={{
              position: "relative",
              textAlign: "center",
              color: "white",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "30px" }}>
              Avatar Meher Baba Pune Centre
            </h1>

            <p style={{ marginTop: "8px", fontSize: "14px" }}>
              Library Books Data
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "250px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <button
            onClick={searchBooks}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              background: "#333",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {/* BOOK LIST */}
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            padding: "10px",
          }}
        >
          {books.length === 0 ? (
            <p style={{ textAlign: "center" }}>No books found</p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                style={{
                  background: "white",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                {/* IMAGE */}
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  />
                )}

                <h3 style={{ margin: "5px 0" }}>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Available: {book.available}</p>
                <p>Price: ₹{book.price}</p>
              </div>
            ))
          )}
        </div>

      </div>

      {/* FOOTER */}
      <div
        style={{
          background: "#222",
          color: "white",
          textAlign: "center",
          padding: "15px",
        }}
      >
        Avatar Meher Baba Pune Centre
      </div>
    </div>
  );
}

export default App;