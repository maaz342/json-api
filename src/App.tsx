import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './component/Table';
import { Post } from './component/Table';
import './App.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]); 

  return (
    <div>
      <h1 className='text-center'>Posts</h1>
      <Table setPosts={setPosts} />
    </div>
  );
}

export default App;
