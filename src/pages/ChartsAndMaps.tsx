import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const fetchWorldData = async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/all");
  return response.data;
};

const fetchCountriesData = async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
};

const fetchGraphData = async () => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return response.data;
};

const ChartsAndMaps = () => {
  const { data: worldData } = useQuery("worldData", fetchWorldData);
  const { data: countriesData } = useQuery("countriesData", fetchCountriesData);
  const { data: graphData } = useQuery("graphData", fetchGraphData);
  console.log(countriesData);
  if (graphData) {
    const cases = Object?.entries(graphData?.cases)?.map((el: any) => el[1]);
    const deaths = Object?.entries(graphData?.deaths)?.map((el: any) => el[1]);
    const recovered = Object?.entries(graphData?.recovered)?.map(
      (el: any) => el[1]
    );
    var data: any = {
      labels,
      datasets: [
        {
          label: "Cases",
          data: cases.slice(0, 10),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Death",
          data: deaths.slice(0, 10),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Recovered",
          data: recovered.slice(20, 40),
          borderColor: "rgb(53, 235, 99)",
          backgroundColor: "rgba(53, 235, 93, 0.5)",
        },
      ],
    };
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-lg font-bold">Worldwide Cases</h2>
        <p>Total Cases: {worldData?.cases}</p>
        <p>Total Recovered: {worldData?.recovered}</p>
        <p>Total Deaths: {worldData?.deaths}</p>
      </div>

      <div>{data && <Line options={options} data={data} />}</div>

      <div>
        <h2 className="text-lg font-bold">Country-Specific Cases</h2>
        <MapContainer style={{ height: "400px" }}>
          {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
          {countriesData?.map((country: any) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Active Cases: {country.active}</p>
                  <p>Total Recovered: {country.recovered}</p>
                  <p>Total Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export { ChartsAndMaps };
