import React, {useState, useEffect,} from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Profile.css'

export default function Profile(props) {

  // const {currentUser = {username:'utkarshuppal'}} = props; 
  // TEMPORARILY DEFAULTING USERNAME TO TEST3
  // CURRENT USER IS NOT BEING PASSED DOWN FROM APP.JSX
  
  const [receivedProfile, setReceivedProfile] = useState([])
  const [rank, setRank] = useState(0);
  const {username} = useParams();

  useEffect(() => {
    console.log(username);
    console.log('useEffect ran')

  fetch(`http://localhost:3001/user/${username}`, {
    method: 'POST',
    // mode: 'no-cors'
    body: JSON.stringify({username: username}),
    headers: { 'Content-Type': 'application/json' }
}).then(response => response.json())
  .then(data => {
    setReceivedProfile(data._doc)
    setRank(data.rank)
    // console.log(data);
  })
  .catch(error => console.log(error))
  
}, []);


  return (
    <div className="Profile">
      <div className="header">
        <div className="header--text">
          <h1>{receivedProfile.fullname}</h1>
          <h2>Ranked #{rank}</h2>
        </div>
      </div>
      <div className="profile-info">
        <div className="totalSolved">
          <h3>Total Solved</h3>
          <h4>{receivedProfile.totalSolved}</h4>
        </div>
        <div className="easySolved">
          <h3>Easy Solved</h3>
          <h4 className='easy'>{receivedProfile.easySolved}</h4>
        </div>
        <div className="mediumSolved">
          <h3>Medium Solved</h3>
          <h4 className='medium'>{receivedProfile.mediumSolved}</h4>
        </div>
        <div className="hardSolved">
          <h3>Hard Solved</h3>
          <h4 className='hard'>{receivedProfile.hardSolved}</h4>
        </div>
   
      </div>
    </div>
  )
}
