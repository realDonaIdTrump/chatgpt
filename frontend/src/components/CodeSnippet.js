import React, { useEffect } from "react";
import Prism from "prismjs";
import { Box } from "@mui/material";
import "prismjs/themes/prism-tomorrow.css"; // Import a dark theme
import "prismjs/components/prism-javascript"; // Import JavaScript syntax
// You can import other languages similarly, like 'prism-css', 'prism-python', etc.

const CodeSnippet = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll(); // Automatically highlight code when rendered
  }, [code]);

  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "#2d2d2d", // Dark background color for the code block
        color: "#f8f8f2", // Light text color
        borderRadius: "8px",
        padding: "16px",
        overflowX: "auto", // Ensure horizontal scrolling for long lines
        fontFamily: "'Fira Code', monospace", // Use a monospace font
        fontSize: "0.9rem", // Adjust font size for better readability
      }}
    >
      <code className={`language-${language}`}>{code}</code>
    </Box>
  );
};

export default CodeSnippet;