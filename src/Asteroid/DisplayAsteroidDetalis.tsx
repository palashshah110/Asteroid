import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function DisplayAsteroidDetalis(props: {
  asteroidDetails: any;
}) {
  console.log(props.asteroidDetails);
  return (
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
        Kilometer:{props.asteroidDetails.estimated_diameter.kilometers.estimated_diameter_max}          
        </Typography>        
        <Typography sx={{ mb: 1.5 }}>
        Meter: {props.asteroidDetails.estimated_diameter.meters.estimated_diameter_max}          
        </Typography>        
        <Typography sx={{ mb: 1.5 }}>
        Miles: {props.asteroidDetails.estimated_diameter.miles.estimated_diameter_max}          
        </Typography>
      </CardContent>
    </Card>
    </Box>
  );
}
