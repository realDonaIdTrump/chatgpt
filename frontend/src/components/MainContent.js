import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";
import InputComponent from "./InputComponent"; // Import the new InputComponent

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Make sure the main container takes full viewport height
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between", // Ensure space between items
}));

const MainContent = ({ open }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (message) => {
    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: "This is a response from the bot!",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000); // Simulated delay for bot response
  };

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Main open={open}>
      <DrawerHeader />
      <Container
        maxWidth="lg"
        sx={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column", 
          height: "calc(100vh - 64px)" // Adjust the height to ensure the scroll area fits the screen
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // Enable vertical scroll
            paddingBottom: "80px", // Reserve space for the input field
            maxHeight: "100%", // Ensure the box can grow and show scrollbar if content overflows
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
            >
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messageEndRef} /> {/* Auto-scroll to the bottom */}
        </Box>
        <InputComponent
          onChange={handleChange}
          onSendMessage={handleSendMessage}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </Container>
    </Main>
  );
};

export default MainContent;
