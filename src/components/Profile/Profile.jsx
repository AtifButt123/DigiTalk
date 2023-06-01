import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import axios from 'axios';

import profilePhoto from "../../assets/images/profile-img3.png";


export default function Profile(props) {
  const [copied, setCopied] = useState(false);
  const [person, setPerson] = useState({});
  const [followersCount, setFollowersCount] = useState(0); // Added friend count state

  const count = 6;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:5000/persons/${props.selectedPerson}`);
      setPerson(response.data)
    }
    fetchData(); 
  }, [props.selectedPerson]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:5000/persons/friendCount/${props.selectedPerson}`); 
      setFollowersCount(res.data.count);
    }
    fetchData();
  }, [props.selectedPerson]);

  // useEffect(async () => {
  // const response = await axios.get(`http://localhost:5000/persons/friendCount/${props.selectedPerson}`);
  // setFollowersCount(response.data.count);
  // }, [person]);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(person.publicKey);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else { // fallback for older browsers or mobiles
      const textarea = document.createElement('textarea');
      textarea.value = person.publicKey;
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="card p-3 profile-container">
      <img
        src={profilePhoto}
        // src={person.image}
        style={{ borderRadius: '50%' }}
        className="card-img-top profile-image img-fluid small-profile mx-auto"
        alt="..."
      />
      <div className="card-body">
        <h3 className="card-title my-2">{person.name}</h3>
        <div className="d-flex align-items-center">
          <h5 className="text-secondary mb-0">
            {/* {person.publicKey.length} */}
            {typeof person.publicKey === 'string' ? person.publicKey.length <= count ? person.publicKey : 
            person.publicKey.slice(0, count) +  "..." : ""}
          </h5>
          <button
            className="btn btn-link text-dark p-0 ms-2"
            data-toggle="tooltip"
            title='Copy'
            onClick={copyToClipboard}
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
          {copied && (
            <span className="text-success ms-2">Copied to clipboard</span>
          )}
        </div>
        <hr className="divider" />
        <h5 className="card-subtitle">{person.nickName}</h5>
        <hr className="divider" />
        <div />
        <div />
        <div className='profile-stats'>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Posts:</strong> {person.postCount ? person.Count : "0"}
            </li>
            <li className="list-group-item">
              <strong>Earned:</strong> {person.money ? person.Money : "0"}
            </li>
            <li className="list-group-item">
              <strong>Followers:</strong> {followersCount ? followersCount : "0"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
