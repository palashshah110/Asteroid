import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
// const Search = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto",
//     },
//   }));
export default function AsteroidForm() {
  const [AsteroidID, setAsteroidID] = useState<number>(0);
  const [openPopup, setopenPopup] = useState<boolean>(false);
  const [asteroidDetails, setAsteroidDetails] = useState<any>(undefined);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${AsteroidID}?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`
      );
      setAsteroidDetails(response.data);
      console.log(response.data);
      setopenPopup(!openPopup);
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
          <Button color="success" variant="contained">
            Random Asteroid
          </Button>
        </Box>
      </Box>
      <Dialog open={openPopup} onClose={() => setopenPopup(false)}>
        <Box sx={{ width: ["auto", 450], height: ["auto", 500] }}>
          <DialogTitle
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            Asteroid Details
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setopenPopup(false)}
            >
              X
            </span>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box
              component={"div"}
              sx={{ padding: "20px", border: "1px solid #000", margin: 2 }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                ID: {asteroidDetails?.id}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Name:{asteroidDetails?.name}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Designation:{asteroidDetails?.designation}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Kilometers:
                {
                  asteroidDetails?.estimated_diameter.kilometers
                    .estimated_diameter_max
                }
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Meters:
                {
                  asteroidDetails?.estimated_diameter.meters
                    .estimated_diameter_max
                }
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Miles:
                {
                  asteroidDetails?.estimated_diameter.miles
                    .estimated_diameter_max
                }
              </Typography>
              <Typography variant="h5">
                Magnitude:{asteroidDetails?.absolute_magnitude_h}
              </Typography>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
}
