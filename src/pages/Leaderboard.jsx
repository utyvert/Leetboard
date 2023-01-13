import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import users from '../components/users';
import '../styles/Leaderboard.css'


export default function Leaderboard(props) {

  const {setAppUsers} = props;

  const [rankedUsers, setRankedUsers] = useState([]);


useEffect(() => {
  console.log('useEffect ran')

  fetch('http://localhost:3001/leaderboard', {
    method: 'GET',
    // mode: 'no-cors'
  }).then(response => response.json())
    .then(data => {
        setTimeout(() => {
            setRankedUsers(data)
            // setAppUsers(data);
            console.log('rankedUsers', rankedUsers, data);
    }, 0)
    })
      .catch(error => console.log(error))
}, []);




// console.log(testUsers);

// console.log('Sorted Users', sortedUsers)



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
        {rankedUsers.map((user, index) => (
          <tr key={user._id}>
            <td>{user.rank}</td>
            <td><Link to = {`/user/${user._doc.leetcode}`}>{user._doc.leetcode}</Link></td>
            <td>{user._doc.fullname}</td>
            <td>{user._doc.totalSolved}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
