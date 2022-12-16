import React, { useCallback, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';

const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo"
const apiUrl = '/interventions';

function ListIntervention(){
  const [interventions, setInterventions] = useState([]);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogout = async () => {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const getInterventions = useCallback(async () => {
    try {
      await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(resp => {
        console.log(resp.data)
        setInterventions(resp.data);
      });
    } catch (error) {
      setError("Failed to fetch interventions");
    }
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Interventions</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            New Intervention       
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={getInterventions}>
          Get Interventions
        </Button>
      </div>
      <div className="table" >
        <ul>
          {interventions.map(intervention => {
            if(intervention.id || intervention.customer_id || intervention.author_id || intervention.building_id || intervention.battery_id || intervention.column_id || intervention.elevator_id || intervention.start_date || intervention.end_date || intervention.result || intervention.report || intervention.status || intervention.created_at || intervention.updated_at ){
              return(
                <li key={intervention.id}>
                  <h1>{intervention.id}</h1>
                  <h1>{intervention.customer_id}</h1>
                  <h1>{intervention.author_id}</h1>
                  <h1>{intervention.building_id}</h1>
                  <h1>{intervention.battery_id}</h1>
                  <h1>{intervention.column_id}</h1>
                  <h1>{intervention.elevator_id}</h1>
                  <h1>{intervention.start_date}</h1>
                  <h1>{intervention.end_date}</h1>
                  <h1>{intervention.result}</h1>
                  <h1>{intervention.report}</h1>
                  <h1>{intervention.status}</h1>
                  <h1>{intervention.created_at}</h1>
                  <h1>{intervention.updated_at}</h1>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </>
  )
}

export default ListIntervention