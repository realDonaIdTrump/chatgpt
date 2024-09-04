import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TemplateFrame from "./TemplateFrame";
import getSignInTheme from "./theme/getSignInTheme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const minimalTheme = createTheme();

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
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alertData, setAlertData] = React.useState({
    showAlert: false,
    severity: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorMessage = validateForm();

    if (errorMessage) {
      setAlertData({
        showAlert: true,
        severity: "error",
        message: errorMessage,
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        email: formData.email,
        password: formData.password,
      });
      setAlertData({
        showAlert: true,
        severity: "success",
        message: "Sign up successful! Redirecting to sign-in page...",
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "An error occurred";
      setAlertData({
        showAlert: true,
        severity: "error",
        message: errorMessage,
      });
    }
  };

  const handleCancel = () => {
    navigate("/");
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
      showToolbar={false}
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
          {alertData.showAlert && (
            <ThemeProvider theme={minimalTheme}>
              <Stack>
                <Alert severity={alertData.severity}>
                  {alertData.message}
                </Alert>
              </Stack>
            </ThemeProvider>
          )}
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            required
            onChange={handleInputChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
            onChange={handleInputChange}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            required
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </SignUpContainer>
    </TemplateFrame>
  );
}

export default SignUp;
