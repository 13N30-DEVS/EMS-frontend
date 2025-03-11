// QueryContext.js
import React, { createContext, useState, useContext } from 'react';

const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);

  const addQuery = (query) => {
    setQueries((prevQueries) => [...prevQueries, query]);
  };

  return (
    <QueryContext.Provider value={{ queries, addQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
};
