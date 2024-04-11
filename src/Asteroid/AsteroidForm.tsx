import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AsteroidForm(props: {
  setAsteroidDetails: (data: any) => void;
}) {
  const [AsteroidID, setAsteroidID] = useState<number>(0);

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${AsteroidID}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`
      );
      if (response) {
        props.setAsteroidDetails(response.data);
        navigate("/getAsteroidDetalis");
      }
    } catch (err) {
      toast.error("Please Check Asteroid Id");
    }
  };

  const handleRandomClick = async () => {
    try {
      const response1 = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`
      );
      const randomID: { id: string }[] = response1?.data?.near_earth_objects.map(
        (item: any) => ({ id: item.id })
      );
      const ranid: number = Math.floor(Math.random() * randomID.length);
      const { id } = randomID[ranid];
      
      const response2 = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`
      );
      if (response2) {
        props.setAsteroidDetails(response2.data);
        navigate("/getAsteroidDetalis");
      }
    } catch (err) {
      console.error("Error fetching random asteroid:", err);
      toast.error("Error fetching random asteroid. Please try again.");
    }
  };
  
  return (
    <>
      <Box component={"div"} className="Container">
        <Box
          component="div"
          sx={{
            background: "#fff",
            width: "100ch",
            height: "150px",
            mt: 5,
            borderRadius: "10px",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "90ch", ml: 5, mt: 2 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Enter Asteroid ID"
              variant="standard"
              type="number"
              value={AsteroidID === 0 ? "" : AsteroidID}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = parseInt(event.target.value);
                setAsteroidID(isNaN(value) ? 0 : value);
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="info"
                variant="outlined"
                sx={{ mr: 3 }}
                onClick={handleClick}
                disabled={AsteroidID.toString().length < 7}
              >
                Search
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleRandomClick}
              >
                Random Asteroid
              </Button>
            </Box>
          </Box>
        </Box>
        <ToastContainer />
      </Box>
    </>
  );
}
