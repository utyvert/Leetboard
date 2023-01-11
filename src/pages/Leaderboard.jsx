import React from 'react'
import { useEffect, useState } from 'react';
import users from '../components/users';
import '../styles/Leaderboard.css'


export default function Leaderboard() {


useEffect(() => {
  console.log('useEffect ran')
  
fetch('http://localhost:3001/leaderboard', {
  method: 'GET',
  // mode: 'no-cors'
}).then(response => response.json())
  .then(data => {
    console.log(data.test)
  })
    .catch(error => console.log(error))
}, []);

const sortedUsers = users.sort((a, b) => b.totalSolved - a.totalSolved);
const [testUsers, setTestUsers] = useState(sortedUsers);

  return (
    <div className='Leaderboard'>
    <h1>Leaderboard</h1>
    <table className='Leaderboard-table'>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Name</th>
          <th>Total Solved</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.slice(0, 10).map((user, index) => (
          <tr key={user.leetcodeusername}>
            <td>{index + 1}</td>
            <td>{user.leetcodeusername}</td>
            <td>{`${user.firstname} ${user.lastname}`}</td>
            <td>{user.totalSolved}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
