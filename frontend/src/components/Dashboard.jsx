import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/user", {
          withCredentials: true // Ensure cookies are sent with the request
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.response?.data?.error || "An error occurred");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ padding: 2 }}>
          {error ? (
            <Typography color="error" variant="h6">
              {error}
            </Typography>
          ) : (
            <>
              <Typography variant="h6">
                Welcome, {userData ? userData.email : "Loading..."}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;
