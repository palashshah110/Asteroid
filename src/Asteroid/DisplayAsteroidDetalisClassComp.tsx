import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "./WithRouter.tsx";
interface State {
  asteroidDetails: any;
}
class DisplayAsteroidDetalisClassComp extends Component <any,State>{
  constructor(props)
  {
    super(props)
    this.state={
      asteroidDetails:null
    }
  }
  componentDidMount(): void {
    const data = this.props.location.state;
    this.setState({asteroidDetails:data});
  }

  render() {
    return (
      <>
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "left",
            backgroundColor: "#2d3748",
            color: "white",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Go Back
        </Link>
        <Box component={"div"} className="Container">
          <Box component={"div"} sx={{ color: "#fff", display: "block" }}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ mb: 1.5 }}>
                  Name: {this.state.asteroidDetails?.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Designation: {this.state.asteroidDetails?.designation}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Id: {this.state.asteroidDetails?.id}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Kilometer:
                  {
                      this.state.asteroidDetails?.estimated_diameter.kilometers
                    .estimated_diameter_max 
                  }
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Meter:
                  {
                      this.state.asteroidDetails?.estimated_diameter.meters
                        .estimated_diameter_max
                  }
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Miles:
                  {
                      this.state.asteroidDetails?.estimated_diameter.miles
                        .estimated_diameter_max
                  }
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </>
    );
  }
}

export default withRouter(DisplayAsteroidDetalisClassComp);
