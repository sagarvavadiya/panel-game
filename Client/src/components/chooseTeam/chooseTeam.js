import React, { useState } from 'react';
import './chooseTeam.css';
import vector from '../../assets/Vector.png';
import vector1 from '../../assets/Vector-1.png';
import Navbar from '../navbar/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Apis } from '../../utils';
import { PostApi } from '../../AllFunction/AllFunction';
const teamCardData = [
  { name: 'team1', img: vector },
  { name: 'team2', img: vector },
  { name: 'team3', img: vector },
  { name: 'team4', img: vector },
];
const TeamCard = props => {
  const navigate = useNavigate();

  return (
    <>
      <div className='ct-container-child curserPointer'>
        <div className='ct-user-option-img-container'>
          <img
            src={props.img}
            className='ct-user-option-img'
            alt='student-icon'
          />
        </div>
        <h1 className='ct-user-option-title'>{props.name}</h1>
      </div>
    </>
  );
};
const uniqId = uuidv4();
const ChooseTeam = () => {
  const [choosenTeam, setChoosenTeam] = useState();
  const navigate = useNavigate();

  const haldleSubmit = () => {
    localStorage.setItem('GameId', `${uniqId}`);
    navigate(`/startgame/${choosenTeam}`);
  };

  // const TeamChoice = (team) => {
  //   const player = localStorage.getItem("playerId");
  //   axios
  //     .post(Apis.JoinTeam, {
  //       teamId: team,
  //       playerId: player,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log("Error in TeamChoice", err);
  //     });
  // };

  return (
    <>
      <div className='ct-user-option-body'>
        <Navbar />
        <div className='ct-user-option-main'>
          <h1>Choose Team</h1>
          <br />
          <div className='ct-option-container'>
            {teamCardData.map((i, index) => {
              return (
                <div
                  onClick={() => {
                    PostApi('joinTeam', {
                      playerId: localStorage.getItem('playerId'),
                      teamId: i.name,
                    });
                    setChoosenTeam(i?.name);
                  }}
                  key={index}
                >
                  <TeamCard name={i.name} img={i.img} />
                </div>
              );
            })}
          </div>
          <br />

          <div className='ct-btn-container'>
            <div className='ct-btn'>
              {choosenTeam ? (
                <button
                  className='ct-button'
                  onClick={haldleSubmit}
                >{`Join ${choosenTeam}`}</button>
              ) : (
                ''
              )}
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default ChooseTeam;
