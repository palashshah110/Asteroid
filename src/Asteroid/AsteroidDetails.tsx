import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

interface asteroidDetailsRowProps {
  absolute_magnitude: number;
  designation: string;
  id: number;
  kilometers: number;
  meters: number;
  miles: number;
  name: string;
}

export default function AsteroidDetails() {
  const [asteroidDetails, setAsteroidDetails] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [asteroidDetailsRow, setAsteroidDetailsRow] = useState<
    asteroidDetailsRowProps[]
  >([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "designation", headerName: "Designation", width: 200 },
    { field: "kilometers", headerName: "Kilometers", width: 200 },
    { field: "meters", headerName: "Meters", width: 200 },
    { field: "miles", headerName: "Miles", width: 200 },
    {
      field: "absolute_magnitude",
      headerName: "Absolute_magnitude",
      width: 200,
    },
  ];

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=6202jSPpG2GqkXh8LHBaPbumSZ1WVY8evbdOavNs`
      );
      setAsteroidDetails(response.data.near_earth_objects);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (asteroidDetails) {
      const newRows = asteroidDetails.map((item: any) => ({
        id: item.id,
        name: item.name,
        designation: item.designation,
        kilometers: item.estimated_diameter.kilometers.estimated_diameter_max,
        meters: item.estimated_diameter.meters.estimated_diameter_max,
        miles: item.estimated_diameter.miles.estimated_diameter_max,
        absolute_magnitude: item.absolute_magnitude_h,
      }));
      setAsteroidDetailsRow(newRows);
    }
  }, [asteroidDetails]);

  return (
    <div
      style={{ height: 400, width: "100%", background: "white", color: "#000" }}
    >
      {loading ? (
        <DataGrid
          rows={asteroidDetailsRow}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
