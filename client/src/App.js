import { useState } from "react";
import { TextField, Button, CircularProgress, Container, Typography, Card, CardContent } from "@mui/material";
import ReactMarkdown from "react-markdown";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false); // Controls "Show More"

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response
    setExpanded(false); // Reset expansion

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      setResponse("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ 
      marginTop: "10px", 
      textAlign: "center",
      height: "580px",
      overflow: "auto",
      padding: "10px"
    }}>
      <Typography variant="h4" gutterBottom>Gemini AI Chat</Typography>

      <TextField
        label="Enter your message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={loading}
        style={{ marginBottom: "20px" }}
      >
        {loading ? "Sending..." : "Send"}
      </Button>

      {loading && <CircularProgress style={{ display: "block", margin: "20px auto" }} />}

      {response && (
        <Card style={{ marginTop: "20px", backgroundColor: "#f9f9f9", textAlign: "left", padding: "15px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>AI Response:</Typography>
            {/* Convert response text into Markdown format for better readability */}
            <ReactMarkdown>{expanded ? response : `${response.slice(0, 300)}...`}</ReactMarkdown>

            {response.length > 300 && (
              <Button size="small" color="primary" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show Less" : "Show More"}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;
