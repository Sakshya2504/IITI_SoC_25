import React, { useState } from 'react';

const sampleData = [
  { title: 'Coding Club Meet', category: 'Clubs', date: '2025-07-10' },
  { title: 'Music Fest', category: 'Events', date: '2025-07-12' },
  { title: 'Sports Day', category: 'Events', date: '2025-07-15' },
  { title: 'Literary Event', category: 'Clubs', date: '2025-07-13' },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredResults, setFilteredResults] = useState(sampleData);

  const handleSearch = () => {
    const results = sampleData.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesDate =
        (!startDate || item.date >= startDate) &&
        (!endDate || item.date <= endDate);
      return matchesTitle && matchesCategory && matchesDate;
    });
    setFilteredResults(results);
  };

  return (
    <>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Clubs">Clubs</option>
          <option value="Events">Events</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="search-results">
        <h2>Filtered Results:</h2>
        {filteredResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredResults.map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>Category: {item.category}</p>
              <p>Date: {item.date}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Search;
