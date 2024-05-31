import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableComponent from './component/Table';

import './App.css';
import  { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <h1 className='text-center'>Posts</h1>
      <TableComponent data={posts} />
    </div>
  );
}

export default App;