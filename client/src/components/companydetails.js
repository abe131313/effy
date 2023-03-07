import React, { Component, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import { CompanyContext } from "../contexts/selectedCompany.js";
import { useState, useContext } from "react";
import { List, ListItem } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import '../styles/map.css'

export default function CompanyDetails() {
  const { compName } = useContext(CompanyContext);
  const [companydetails, setcompanydetails] = useState([]);
  const [location, setLocation] = useState({});
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBnNQ8aXyishWpZySSm9gjZ8pON8d70Vks",
  });
  let coordinatesArr;
  const getCompanyaddress = async () => {
    let request = await axios.post(
      `http://localhost:5000/api/getSpecificCompany`,
      {
        company_name: `${compName}`,
      }
    );
    coordinatesArr = request.data[0]["coordinates"].split(",");
    setLocation({
      address: `${request.data[0]["companyAddress"]}`,
      lat: `${coordinatesArr[0]}`,
      lng: `${coordinatesArr[1]}`,
    });

    setcompanydetails([...request.data]);
    console.log(companydetails);
    // console.log(compName);
  };
  useEffect(() => {
    getCompanyaddress();
  }, []);

  function Map() {
    if(!location) return <div>please wait...</div> 
    return (
      <GoogleMap
        zoom={10}
        center={{
          lat: Number(location.lat),
          lng: Number(location.lng),
        }}
        mapContainerClassName="google-map"
      >
        <Marker position={{lat:Number(location.lat),lng:Number(location.lng)}}/>
      </GoogleMap>
    );
  }
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="h1" gutterBottom>
          Company Details
        </Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <List>
          {companydetails.map((e, i) => {
            return (
              <>
                <ListItem>
                  <Typography variant="h6" gutterBottom>
                    Company name:
                    {JSON.stringify(companydetails[0]["companyName"])}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h6" gutterBottom>
                    Company address:
                    {JSON.stringify(companydetails[0]["companyAddress"])}
                  </Typography>
                </ListItem>
              </>
            );
          })}
        </List>
      </Box>
      <Map />
    </>
  );
}
