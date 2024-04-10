import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface idsprops{
  id:number
}
export default function AsteroidForm(props: {
  setAsteroidDetails: (data: any) => void;
}) {

  const [AsteroidID, setAsteroidID] = useState<number>(0);
  const [data, setData] = useState<any>(undefined);
  const [ids, setIDs] = useState<idsprops>({id:1});

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
        toast.error('Please Check Asteroid Id');
    }
  };

  const handleRandomClick = async () => {
    try {
      const randomid = Math.floor(Math.random() * 20);
      const {id} = ids[randomid];
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`
      );
      if (response) {
        props.setAsteroidDetails(response.data);
        navigate("/getAsteroidDetalis");
      }
    } catch (err) {
        toast.error('Please Check Asteroid Id');
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`
      );
      setData(response.data.near_earth_objects);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const ids = data.map((item: any) => ({
        id: item.id }));
      setIDs(ids);
    }
  }, [data]);

  return (
    <>
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
            >
              Search
            </Button>
            <Button color="success" variant="contained" onClick={handleRandomClick}>
              Random Asteroid
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer/>
    </>
  );
}
