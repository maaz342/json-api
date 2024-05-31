import React from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  data: Post[];
}

function Table({ data }: Props) {
  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th className='text-center'>ID</th>
          <th className='text-center'>Title</th>
          <th className='text-center'>Body</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: Post) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

