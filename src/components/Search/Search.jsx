import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { FaSearch, FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { debounce } from 'lodash';

function Search({ onPersonClick }) {
  const id = "6471e1cb8661253a93967d0d";
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }
    try {
      const result = await axios.get(`http://localhost:5000/persons/${id}`);
      const itself = result.data;

      const res = await axios.get(`http://localhost:5000/persons/search?name=${query}&publicKey=${query}`);

      res.data = res.data.filter(item => {
        return item._id !== id
      })

      const updatedResults = res.data.map((person) => {
        const isFriend = itself.friends.includes(person._id);
        const hasFriendRequest = itself.friendRequests.includes(person._id);
        return {
          ...person,
          isFriend,
          hasFriendRequest,
        };
      });
      console.log(updatedResults)
      setResults(updatedResults);
    } catch (err) {
      console.error(err);
    }
  };

  const delayedSearch = debounce(handleSearch, 500);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    delayedSearch(value);
    if (!value) {
      setResults([]);
    }
  };

  const handleFriendAdd = async (personId, hasFriendRequest) => {
    try {
      console.log(hasFriendRequest)
      if (!hasFriendRequest) {
        const newresult = await axios.post(`http://localhost:5000/persons/sendFriendRequest`,
          {
            _id: id,
            personId,
          })
        if (newresult.data) {
          window.alert("Request sent successfully...");
          results.map((p) => {
            if (newresult.data.friendRequests.includes(p._id)) {
              p.hasFriendRequest = true;
            }
          })
        }
      }
      else {
        const list = await axios.post(`http://localhost:5000/persons/cancelFriendRequest`,
          {
            _id: id,
            personId,
          })
        if (list) {
          window.alert("You cancelled request!");
          results.map(p => {
            if (p._id = personId) {
              p.hasFriendRequest = false;
            }
          })
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="search-container my-3">
      <div className="search-form">
        <input className='form-control' type="text" value={query} onChange={handleChange} placeholder="Search by name or key" />
        <button className='mx-2 rounded' onClick={() => handleSearch(query)} ><FaSearch /></button>
      </div>
      <div className='w-100'>
        <ul className="search-results w-100">
          {results.map((person, index) => (
            <li key={index} className="w-100 search-result d-flex justify-content-between">
              <div>
                <button className='btn btn-primary' onClick={() => onPersonClick(person._id)}>{person.name}</button>
              </div>
              <div>
                {
                  person.isFriend ? "" :
                    person.hasFriendRequest ?
                      <button
                        className='btn btn-success float-right'
                        onClick={() => { handleFriendAdd(person._id, person.hasFriendRequest) }}
                      // disabled={person.isFriend || person.hasFriendRequest}
                      >
                        <FaUserCheck
                        />
                      </button>
                      :
                      <button
                        className='btn btn-primary float-right'
                        onClick={() => handleFriendAdd(person._id, person.isFriend, person.hasFriendRequest)}
                      // disabled={person.isFriend || person.hasFriendRequest}
                      >
                        <FaUserPlus />
                      </button>
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
