import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo"
const apiUrl = 'https://java-api.codeboxxtest.xyz/interventions/new';

function AddIntervention() {
  const [interventionCustomer, setInterventionCustomer] = useState("");
  const [interventionBattery, setInterventionBattery] = useState("");
  const [interventionBuilding, setInterventionBuilding] = useState("");
  const [interventionColumn, setInterventionColumn] = useState("");
  const [interventionElevator, setInterventionElevator] = useState("");
  const [interventionStatus, setInterventionStatus] = useState("");
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [interventions, setInterventions] = useState([], {
    "customerID": 1,
    "buildingID": 4,
    "batteryID": 43,
    "columnID": 3,
    "elevatorID": 4,
    "report": "testy"
  });

  const handleLogout = async () => {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      await axios.post(apiUrl, {
        "customerID": 1,
        "buildingID": 4,
        "batteryID": 43,
        "columnID": 3,
        "elevatorID": 4,
        "report": "testy"
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(resp => {
      console.log(resp.data);
  });;
      history.push("/")
    } catch {
      setError("Failed to create an intervention")
    }
  }, [history])



  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(apiUrl, {
        "customerID": 1,
        "buildingID": 4,
        "batteryID": 43,
        "columnID": 3,
        "elevatorID": 4,
        "report": "testy"
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setInterventions(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Intervention</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="interventionCustomer">
              <Form.Label>Customer</Form.Label>
              <Form.Control type="text" onChange={e => setInterventionCustomer(e.target.value)} required />
            </Form.Group>
            <Form.Group id="interventionBattery">
              <Form.Label>Battery</Form.Label>
              <Form.Control type="text" onChange={e => setInterventionBattery(e.target.value)} required />
            </Form.Group>
            <Form.Group id="interventionBuilding">
              <Form.Label>Building</Form.Label>
              <Form.Control type="text" onChange={e => setInterventionBuilding(e.target.value)} required />
            </Form.Group>
            <Form.Group id="interventionColumn">
              <Form.Label>Column</Form.Label>
              <Form.Control type="text" onChange={e => setInterventionColumn(e.target.value)} required />
            </Form.Group>
            <Form.Group id="interventionElevator">
              <Form.Label>Elevator</Form.Label>
              <Form.Control type="text" onChange={e => setInterventionElevator(e.target.value)} required />
            </Form.Group>
            <Form.Group id="interventionStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" onChange={e => setInterventionStatus(e.target.value)} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Add Intervention
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}

export default AddIntervention