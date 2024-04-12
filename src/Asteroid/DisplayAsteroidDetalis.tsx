import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function DisplayAsteroidDetalis(props: {
  asteroidDetails: any;
}) 
{
  const navigate = useNavigate();
  return (
    <>
      <Box
        onClick={() => navigate("/")}
        sx={{ display: "block", textAlign: "left",  backgroundColor: '#2d3748',color:'white',cursor:'pointer' }}
      >
        <Typography variant="h5">Go Back</Typography>
      </Box>

      <Box component={"div"} className="Container">
        <Box component={"div"} sx={{ color: "#fff", display: "block" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }}>
                Name: {props.asteroidDetails.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Designation: {props.asteroidDetails.designation}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Id: {props.asteroidDetails.id}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Kilometer:
                {
                  props.asteroidDetails.estimated_diameter.kilometers
                    .estimated_diameter_max
                }
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Meter:
                {
                  props.asteroidDetails.estimated_diameter.meters
                    .estimated_diameter_max
                }
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Miles:{" "}
                {
                  props.asteroidDetails.estimated_diameter.miles
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
