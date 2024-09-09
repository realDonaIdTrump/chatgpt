import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Container, Box, Avatar, Typography } from "@mui/material";
import InputComponent from "./InputComponent"; // Import the new InputComponent
import CodeSnippet from "./CodeSnippet";

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
    minHeight: "100vh", // Ensure the main container takes full viewport height
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

  const handleSendMessage = (message) => {
    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: "This is a response from the bot!",
        code: `import React from 'react';\n\nconst MyComponent = () => {\n  return <div>Hello World!</div>;\n};\n\nexport default MyComponent;`,
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
          alignItems: "center",
          justifyContent: "space-between",
          height: "calc(100vh - 64px)", // Ensure the content fits within the viewport
        }}
      >
        {/* Message box with fixed width on MD+ and responsive on smaller screens */}
        <Box
          sx={{
            width: { xs: "95%", sm: "85%", md: "800px" }, // Responsive width for XS and SM, fixed for MD+
            maxHeight: "calc(100vh - 150px)", // Limit height to make sure scrolling works
            flexGrow: 1,
            overflowY: "auto", // Enable vertical scroll
            padding: "20px", // Add some padding inside the box
            borderRadius: "8px", // Rounded corners
            mb: 2, // Margin bottom for spacing between messages and input
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                mb: 2, // Add margin between messages
              }}
            >
              {/* Display avatar next to the message */}
              {msg.sender === "bot" && (
                <Avatar
                  alt="Bot"
                  src="/bot-avatar.png" // Replace with your bot avatar
                  sx={{ mr: 2 }}
                />
              )}

              <Box
                sx={{
                  backgroundColor:
                    msg.sender === "user" ? "#e3e3e3" : "transparent", // Background color for user messages only
                  borderRadius: "8px",
                  width: msg.sender === "user" ? "50%" : "100%", // Adjust width based on sender
                  padding: "10px 15px",
                  textAlign: msg.sender === "user" ? "right" : "left",
                  wordBreak: "break-word", // Ensure long words break correctly
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {msg.text}
                </Typography>

                {/* If the message contains code, render the code snippet */}
                {msg.code && (
                  <Box mt={1}>
                    <CodeSnippet code={msg.code} language="javascript" />
                  </Box>
                )}
              </Box>

              {/* User's avatar on the right side */}
              {msg.sender === "user" && (
                <Avatar
                  alt="User"
                  src="/user-avatar.png" // Replace with your user avatar
                  sx={{ ml: 2 }}
                />
              )}
            </Box>
          ))}
          <div ref={messageEndRef} /> {/* Auto-scroll to the bottom */}
        </Box>

        {/* Input Component with consistent responsive width */}
        <Box
          sx={{
            width: { xs: "95%", sm: "85%", md: "800px" }, // Same width as message box
            bottom: 0, // Fixed at the bottom of the container
          }}
        >
          <InputComponent
            onSendMessage={handleSendMessage}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </Box>
      </Container>
    </Main>
  );
};

export default MainContent;
