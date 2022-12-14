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
  // const [foods, setFoods] = useState([]);
  const [interventions, setInterventions] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const InterventionList = async () => {
    try {
      const { data } = await axios.get("https://java-api.codeboxxtest.xyz/interventions");
      localStorage.setItem('token', data.token);
      setInterventions(
        data.map(({ id, interventionId, interventionStatus, interventionStartDate, interventionEndDate, interventionTechnician, interventionCustomer, interventionBuilding, interventionBattery, interventionColumn, interventionElevator, interventionResult, interventionReport, interventionReportFile, interventionPicture, interventionPictureFile, interventionAuthor, interventionCreatedAt, interventionUpdatedAt }) => ({
          id,
          interventionId,
          interventionStatus,
          interventionStartDate,
          interventionEndDate,
          interventionTechnician,
          interventionCustomer,
          interventionBuilding,
          interventionBattery,
          interventionColumn,
          interventionElevator,
          interventionResult,
          interventionReport,
          interventionReportFile,
          interventionPicture,
          interventionPictureFile,
          interventionAuthor,
          interventionCreatedAt,
          interventionUpdatedAt
        }))
      )
    }
    catch (err) {
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
        <button onClick={() => InterventionList()}>
          Get List
        </button>
        <ul>
        <div className="colu">
          {interventions.map(intervention => (
            <li key={intervention.id}>
              <div>
                <h2>Intervention id: {intervention.interventionId}</h2>
                <h2>Intervention Status: {intervention.interventionStatus}</h2>
                <h2>Intervention Start Date: {intervention.interventionStartDate}</h2>
                <h2>Intervention End Date: {intervention.interventionEndDate}</h2>
                <h2>Intervention Technician: {intervention.interventionTechnician}</h2>
                <h2>Intervention Customer: {intervention.interventionCustomer}</h2>
                <h2>Intervention Building: {intervention.interventionBuilding}</h2>
                <h2>Intervention Battery: {intervention.interventionBattery}</h2>
                <h2>Intervention Column: {intervention.interventionColumn}</h2>
                <h2>Intervention Elevator: {intervention.interventionElevator}</h2>
                <h2>Intervention Result: {intervention.interventionResult}</h2>
                <h2>Intervention Report: {intervention.interventionReport}</h2>
                <h2>Intervention Report File: {intervention.interventionReportFile}</h2>
                <h2>Intervention Picture: {intervention.interventionPicture}</h2>
                <h2>Intervention Picture File: {intervention.interventionPictureFile}</h2>
                <h2>Intervention Author: {intervention.interventionAuthor}</h2>
                <h2>Intervention Created At: {intervention.interventionCreatedAt}</h2>
                <h2>Intervention Updated At: {intervention.interventionUpdatedAt}</h2>
              </div>
            </li>
          ))}
        </div>
        <style>
          {`

            body {
              background-image: linear-gradient(79deg, #7439db, #4524e9 48%, #e9f74d);
              animation: gradient 15s ease infinite;
            }

            .colu {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              width: 100%;


             
            }
            .colu li {
              width: 5000px
              margin: 10px;
              padding: 10px;
              border: 1px solid black;
              border-radius: 5px;
            }

            .colu li h2 {
              margin: 0;
              padding: 0;
            }

            .colu li div {
              padding: 10px;
              border: 1px solid black;
              border-radius: 5px;
              width: 1000px
            }

            .colu li div h2 {
              margin: 0;
              padding: 0;
            }

            .colu li div h2:first-child {
              margin-bottom: 10px;
            }

            .colu li div h2:last-child {
              margin-top: 50px;
            }

            .colu li div h2 span {
              font-weight: bold;
            }

            .colu li div h2 span::after {
              content: ":";
            }

            .colu li div h2 span::before {
              content: "";
            }

            

          `}
           
        </style>
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

