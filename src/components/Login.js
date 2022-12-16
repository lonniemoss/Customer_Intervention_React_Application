import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';

const apiUrl = 'http://localhost:3001';
//this section is for the axios interceptor. The interceptor will add the authorization header to all requests to the API
axios.interceptors.request.use(
  config => {
    config.headers
      .Authorization = `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo"}`;
    return config;
  }
);

//==========================================this function is used to get the JWT====================================================
export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  const [fetchError, setFetchError] = useState(null);
  const [foods, setFoods] = useState([]);

  const getJwt = async () => {
    const { data } = await axios.get("https://java-api.codeboxxtest.xyz/authenticate?email=customer1%40business.com&password=password123");
    localStorage.setItem('token', data.token);
    setJwt(data.token);
  };

//this function will be used for the form to get the user authenticate
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}  >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button onClick={() => getJwt()} disabled={loading} className="w-100" type="submit">
              Log In
            </Button>

          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <style>{`
          body {
              background-image: linear-gradient(79deg, #7439db, #4524e9 48%, #e9f74d);
              animation: gradient 15s ease infinite;
            }
          `}
          </style>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}


