import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          "http://localhost:5000/api/users/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
            <Typography variant="h6">
              Welcome, {userData ? userData.email : "Loading..."}
            </Typography>
          )}
          {/* Add more user data or components here */}
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;
