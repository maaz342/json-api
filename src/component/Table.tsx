// Table.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const Table: React.FC<Props> = ({ setPosts }) => {
  const [posts, setLocalPosts] = useState<Post[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setLocalPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  const handleUpdatePost = () => {
    const id = prompt('Enter the ID of the post to update:');
    if (id) {
      const title = prompt('Enter the new title:');
      const body = prompt('Enter the new body:');
      if (title && body) {
        alert(`Updating post with ID ${id}`);
        axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          title,
          body,
        })
        .then(response => {
          console.log('Post updated successfully:', response.data);
          setLocalPosts(prevPosts => {
            return prevPosts.map(post => {
              if (post.id === parseInt(id)) {
                return { ...post, title, body };
              }
              return post;
            });
          });
        })
        .catch(error => {
          console.error('Error updating post: ', error);
        });
      }
    }
  };
  
  const handleDeletePost = () => {
    const id = prompt('Enter the ID of the post to delete:');
    if (id) {
      alert(`Deleting post with ID ${id}`);
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        console.log('Post deleted successfully');
        setLocalPosts(prevPosts => {
          return prevPosts.filter(post => post.id !== parseInt(id));
        });
      })
      .catch(error => {
        console.error('Error deleting post: ', error);
      });
    }
  };
  const handleAddPost = () => {
    const id = prompt('Enter the ID:');
    const title = prompt('Enter the title:');
    const body = prompt('Enter the body:');
    if (id && title && body) {
      alert(`Adding new post...`);
      axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        id: parseInt(id), 
        title,
        body,
        userId: 1,
      })
      .then(response => {
        console.log('Post added successfully:', response.data);
        setLocalPosts(prevPosts => [...prevPosts, response.data]);
      })
      .catch(error => {
        console.error('Error adding post: ', error);
      });
    }
  };
  
  return (
    <div className="container mt-4">
    <div className="d-flex justify-content-between mb-3">
      <button className="btn btn-primary" onClick={getData}>Refresh</button>
        <button className="btn btn-success mr-2" onClick={handleAddPost}>Add Post</button>
        <button className="btn btn-warning mr-2" onClick={handleUpdatePost}>Update Post</button>
        <button className="btn btn-danger" onClick={handleDeletePost}>Delete Post</button>
    </div>
    {posts.length > 0 && (
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th className='text-center'>ID</th>
            <th className='text-center'>Title</th>
            <th className='text-center'>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
};


export default Table;


