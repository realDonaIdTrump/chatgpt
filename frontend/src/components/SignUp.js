import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TemplateFrame from "./TemplateFrame";
import getSignInTheme from "./theme/getSignInTheme";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios for HTTP requests
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const SignUpContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80%",
  maxWidth: "400px",
  margin: "auto",
  padding: theme.spacing(3),
  boxSizing: "border-box",
}));

function SignUp() {
  const [mode, setMode] = React.useState("light");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const navigate = useNavigate(); // Create navigate function
  const [showSucessAlert, setSuccessAlert] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleCancel = () => {
    navigate("/"); // Navigate to the sign-in page
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorMessage("Passwords do not match.");
      return;
    }
    try {
      // Make a POST request to your backend API
      await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
      });
      setAlertMessage("Sign up successful! Redirecting to sign-in page...");
      setAlertSeverity("success");
      setSuccessAlert(true);
      // Redirect to sign-in page upon successful sign-up
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error signing up:", error);
      // Extract and set the error message
      const errorMessage =
        error.response?.data?.error || error.message || "An error occurred";
      setAlertMessage(errorMessage);
      setAlertSeverity("error");
      setSuccessAlert(true);
    }
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = (useCustomTheme) => {
    // Implement custom theme toggling logic if needed
  };

  const signUpTheme = createTheme(getSignInTheme(mode));

  return (
    <TemplateFrame
      showCustomTheme={true}
      toggleCustomTheme={toggleCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
      showToolbar={false} // Hide the toolbar
    >
      <SignUpContainer>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          {showSucessAlert && (
            <Stack>
              <Alert severity={alertSeverity}>{alertMessage}</Alert>
            </Stack>
          )}
          <TextField
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="outlined"
            required
          />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            variant="outlined"
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={handleCancel} // Redirects to OAuth
          >
            Cancel
          </Button>
        </Box>
      </SignUpContainer>
    </TemplateFrame>
  );
}

export default SignUp;
