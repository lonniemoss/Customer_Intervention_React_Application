import React, { useCallback, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';

const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo"
const apiUrl = 'https://java-api.codeboxxtest.xyz/interventions';


axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const getFoods = async () => {
    try {
      const { data } = await axios.get("https://java-api.codeboxxtest.xyz/interventions");
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    }
  );

  function App() {
    const [users, setUsers] = useState([]);
    const [requestError, setRequestError] = useState();

    const fetchData = useCallback(async () => {
      try {
        const result = await axios.get('https://java-api.codeboxxtest.xyz/interventions');
        setUsers(result.data);
        setRequestError(null);
      } catch (err) {
        setRequestError(err.message);
      }
    }, []);
  }

  return (
    <>
      <section>
        <button onClick={() => getFoods()}>
          Get List
        </button>
        <ul>
          {foods.map((food, i) => (
            <li>{food.description}</li>
          ))}
        </ul>
        {fetchError && (
          <p style={{ color: 'red' }}>{fetchError}</p>
        )}
      </section>
      <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
        New Request
      </Link>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );


}

