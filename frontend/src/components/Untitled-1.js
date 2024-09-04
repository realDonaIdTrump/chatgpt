import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import getSignInTheme from "./theme/getSignInTheme";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import TemplateFrame from "./TemplateFrame";
import VectorIcon from "./VectorIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignIn() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef(undefined);
  const navigate = useNavigate();

  React.useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!validateInputs()) {
      return;
    }
    setSuccess(false);
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          { email, password },
          { withCredentials: true } // Include credentials with the request
        );

        if (response.status === 200) {
          setSuccess(true);
          setLoading(false);
          navigate("/dashboard");
        } else {
          setLoading(false);
          setPasswordError(true);
          setPasswordErrorMessage(
            "Login failed. Please check your credentials."
          );
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setLoading(false);
        setPasswordError(true);
        setPasswordErrorMessage(
          error.response?.data?.error || "An error occurred. Please try again."
        );
      }
    }, 2000); // Simulated delay
  };

  const buttonSx = {
    color: "white !important",
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
    ...(loading && {
      color: "white !important",
    }),
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <VectorIcon />
            <Typography
              component="h1"
              variant="h4"
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
              }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel
                  htmlFor="email"
                  sx={{
                    marginBottom: 1,
                    textAlign: "left",
                  }}
                >
                  Email
                </FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    component="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: "baseline" }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={buttonSx}
                endIcon={loading && <CircularProgress color="inherit" size={24} />}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Divider orientation="vertical" flexItem />
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                      borderRadius: "50px",
                      flex: 1,
                      justifyContent: "center",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.1)",
                      },
                    }}
                    startIcon={<GoogleIcon />}
                    onClick={() => {
                      window.location.href = "http://localhost:5000/api/auth/google";
                    }}
                  >
                    Sign In with Google
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                      borderRadius: "50px",
                      flex: 1,
                      justifyContent: "center",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.1)",
                      },
                    }}
                    startIcon={<FacebookIcon />}
                  >
                    Sign In with Facebook
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
          <ForgotPassword open={open} onClose={handleClose} />
        </SignInContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
