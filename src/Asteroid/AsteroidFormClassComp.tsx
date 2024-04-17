import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import withRouter from "./WithRouter.tsx";

const apiKey = process.env.API_KEY || "6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs";
interface propsType{
  navigate:(data:any,state:any)=>void;
}
interface State {
  AsteroidID: number;
  errorMessage:string;
}
class AsteroidFormClassComp extends React.Component<propsType,State>{
  constructor(props) {
    super(props);
    this.state = {
      AsteroidID: 0,
      errorMessage:''
    };
  }
  handleRandomClick = async () => {
    try {
      const response1 = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`
      );
      const data = await response1.data;
      const randomid = Math.floor(Math.random() * data.near_earth_objects.length);
      const newdata = data.near_earth_objects[randomid];
      this.props.navigate('/getAsteroidDetalis',{state:newdata})
    } catch (err) {
      this.setState({errorMessage:'Error fetching random asteroid. Please try again.'}) 
    }
  };
  handleClick = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${this.state.AsteroidID}?api_key=${apiKey}`
      );
      const data = await response.data;
      if (data) 
        {
        this.props.navigate('/getAsteroidDetalis',{state:data});
      }
    } catch (err) {
     this.setState({ errorMessage: 'Please Check Asteroid Id' }); 
    }
  };
  render() {
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
                placeholder="Enter Asteroid ID"
                variant="standard"
                type="number"
                value={this.state.AsteroidID === 0 ? "" : this.state.AsteroidID}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = parseInt(event.target.value);
                  this.setState({ AsteroidID: isNaN(value) ? 0 : value });
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="info"
                  variant="outlined"
                  sx={{ mr: 3 }}
                  
                  onClick={()=>this.handleClick()}
                  disabled={this.state.AsteroidID?.toString().length < 7}
                >
                  Search
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={this.handleRandomClick}
                >
                  Random Asteroid
                </Button>
              </Box>
              {this.state.errorMessage && <Typography>{this.state.errorMessage}</Typography>}
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}


export default withRouter(AsteroidFormClassComp);