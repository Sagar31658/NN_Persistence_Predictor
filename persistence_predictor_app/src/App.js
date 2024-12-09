import React, { useState } from "react";
import "./App.css";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";

function App() {
  const [formData, setFormData] = useState({
    "First Term Gpa' numeric": "",
    "Second Term Gpa' numeric": "",
    "First Language' numeric": "",
    " Funding numeric": "",
    "School numeric": "",
    "FastTrack numeric": "",
    "Coop numeric": "",
    " Residency numeric": "",
    "Gender numeric": "",
    "Previous Education' numeric": "",
    "Age Group' numeric": "",
    "High School Average Mark' numeric": "",
    "Math Score' numeric": "",
    "English Grade' numeric": "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setResult({ error: "An error occurred while processing your request." });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Could not connect to the server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
  sx={{
    maxWidth: 800,
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
    background: "linear-gradient(to right, #FFEFBA, #FFFFFF)",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    border: "2px solid #34495e",
  }}
>
  <Typography
    component="h1"
    sx={{
      fontSize: "2.8rem",
      fontFamily: "'Playfair Display', serif", // Elegant serif font
      color: "#2c3e50", // Deep steel blue
      textTransform: "uppercase",
      letterSpacing: "5px",
      fontWeight: "bold",
      textShadow: "2px 2px 0px #fff, 4px 4px 0px rgba(0, 0, 0, 0.1)", // Retro shadow
      margin: "0",
    }}
  >
    First Year Persistence Predictor
  </Typography>
  <Typography
    sx={{
      fontSize: "1rem",
      fontFamily: "'Courier New', Courier, monospace",
      color: "#7f8c8d",
      marginTop: "10px",
    }}
  >
    Helping predict academic success with reliable insights
  </Typography>


      <form onSubmit={handleSubmit}>
        {/* Academic Information */}
        <Typography variant="h6" gutterBottom>
          Academic Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Term GPA (0.0-4.5)"
              name="First Term Gpa' numeric"
              type="number"
              value={formData["First Term Gpa' numeric"]}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Second Term GPA (0.0-4.5)"
              name="Second Term Gpa' numeric"
              type="number"
              value={formData["Second Term Gpa' numeric"]}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="High School Average Mark (0.0-100.0)"
              name="High School Average Mark' numeric"
              type="number"
              value={formData["High School Average Mark' numeric"]}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Math Score (0.0-50.0)"
              name="Math Score' numeric"
              type="number"
              value={formData["Math Score' numeric"]}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="English Grade"
              name="English Grade' numeric"
              select
              value={formData["English Grade' numeric"]}
              onChange={handleChange}
            >
              {[...Array(11).keys()].map((i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  Level-{i+1}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Personal Information */}
        <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Language"
              name="First Language' numeric"
              select
              value={formData["First Language' numeric"]}
              onChange={handleChange}
            >
              <MenuItem value={1}>English</MenuItem>
              <MenuItem value={2}>French</MenuItem>
              <MenuItem value={3}>Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gender"
              name="Gender numeric"
              select
              value={formData["Gender numeric"]}
              onChange={handleChange}
            >
              <MenuItem value={1}>Female</MenuItem>
              <MenuItem value={2}>Male</MenuItem>
              <MenuItem value={3}>Neutral</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Residency"
              name=" Residency numeric"
              select
              value={formData[" Residency numeric"]}
              onChange={handleChange}
            >
              <MenuItem value={1}>Domestic</MenuItem>
              <MenuItem value={2}>International</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age Group"
              name="Age Group' numeric"
              select
              value={formData["Age Group' numeric"]}
              onChange={handleChange}
            >
              {[...Array(10).keys()].map((i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {["0 to 18", "19 to 20", "21 to 25", "26 to 30", "31 to 35", "36 to 40", "41 to 50", "51 to 60", "61 to 65", "66+"][i]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Program Information */}
        <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
          Program Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="School"
              name="School numeric"
              select
              value={formData["School numeric"]}
              onChange={handleChange}
            >
              {[
                "Advancement",
                "Business",
                "Communications",
                "Community and Health",
                "Hospitality",
                "Engineering",
                "Transportation",
              ].map((name, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Funding"
              name=" Funding numeric"
              select
              value={formData[" Funding numeric"]}
              onChange={handleChange}
            >
              {[
                "Apprentice_PS",
                "GPOG_FT",
                "Intl Offshore",
                "Intl Regular",
                "Intl Transfer",
                "Joint Program Ryerson",
                "Joint Program UTSC",
                "Second Career Program",
                "Work Safety Insurance Board",
              ].map((name, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fast Track"
              name="FastTrack numeric"
              select
              value={formData["FastTrack numeric"]}
              onChange={handleChange}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={2}>No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Co-op"
              name="Coop numeric"
              select
              value={formData["Coop numeric"]}
              onChange={handleChange}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={2}>No</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Predict"}
          </Button>
        </form>
  
        {/* Display Prediction Results */}
        {result && (
          <Card sx={{ marginTop: 4 }}>
            <CardContent>
              {result.prediction !== undefined ? (
                <>
                  <Typography variant="h5">Prediction Result</Typography>
                  <Typography variant="body1">
                    Persistence: {result.prediction === 1 ? "Yes" : "No"}
                  </Typography>
                  <Typography variant="body1">
                    Probability: {result.probability.toFixed(2)}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" color="error">
                  {result.error}
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    );
  }
  
  export default App;
  
