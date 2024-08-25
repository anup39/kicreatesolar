import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import { Divider, Typography, Box, Card } from "@mui/material";
import {
  IconCalculator,
  IconSolarPanel,
  IconSolarPanel2,
  IconSatellite,
} from "@tabler/icons-react";

// project-import
import ResultControlPanelStyled from "../../../../../ui-component/third-party/map/ResultControlPanelStyled";
import TickPlacementBars from "./barchart";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

const api_details = {
  inputs: {
    location: {
      latitude: 55.39817761063476,
      longitude: 11.32660036361628,
      elevation: 38,
    },
    meteo_data: {
      radiation_db: "PVGIS-SARAH2",
      meteo_db: "ERA5",
      year_min: 2005,
      year_max: 2020,
      use_horizon: true,
      horizon_db: "DEM-calculated",
    },
    mounting_system: {
      fixed: {
        slope: {
          value: 35,
          optimal: false,
        },
        azimuth: {
          value: 0,
          optimal: false,
        },
        type: "free-standing",
      },
    },
    pv_module: {
      technology: "c-Si",
      peak_power: 1024.13,
      system_loss: 14,
    },
    economic_data: {
      system_cost: null,
      interest: null,
      lifetime: null,
    },
  },
  outputs: {
    monthly: {
      fixed: [
        {
          month: 1,
          E_d: 756.6,
          E_m: 23454.47,
          "H(i)_d": 0.87,
          "H(i)_m": 26.9,
          SD_m: 6600.71,
        },
        {
          month: 2,
          E_d: 1556.99,
          E_m: 43595.86,
          "H(i)_d": 1.75,
          "H(i)_m": 49,
          SD_m: 12179.09,
        },
        {
          month: 3,
          E_d: 2957.74,
          E_m: 91690.01,
          "H(i)_d": 3.38,
          "H(i)_m": 104.79,
          SD_m: 16061.06,
        },
        {
          month: 4,
          E_d: 4573.68,
          E_m: 137210.4,
          "H(i)_d": 5.37,
          "H(i)_m": 161.22,
          SD_m: 17621.04,
        },
        {
          month: 5,
          E_d: 4855.2,
          E_m: 150511.31,
          "H(i)_d": 5.85,
          "H(i)_m": 181.47,
          SD_m: 17777.65,
        },
        {
          month: 6,
          E_d: 4979.19,
          E_m: 149375.63,
          "H(i)_d": 6.11,
          "H(i)_m": 183.32,
          SD_m: 8989.35,
        },
        {
          month: 7,
          E_d: 4749.67,
          E_m: 147239.67,
          "H(i)_d": 5.9,
          "H(i)_m": 182.9,
          SD_m: 17534.81,
        },
        {
          month: 8,
          E_d: 4220.31,
          E_m: 130829.5,
          "H(i)_d": 5.18,
          "H(i)_m": 160.56,
          SD_m: 10484.13,
        },
        {
          month: 9,
          E_d: 3447.66,
          E_m: 103429.73,
          "H(i)_d": 4.12,
          "H(i)_m": 123.47,
          SD_m: 8733.41,
        },
        {
          month: 10,
          E_d: 2193.65,
          E_m: 68003.29,
          "H(i)_d": 2.55,
          "H(i)_m": 79.14,
          SD_m: 13409.46,
        },
        {
          month: 11,
          E_d: 1048.08,
          E_m: 31442.53,
          "H(i)_d": 1.21,
          "H(i)_m": 36.45,
          SD_m: 5838.57,
        },
        {
          month: 12,
          E_d: 588.61,
          E_m: 18246.83,
          "H(i)_d": 0.72,
          "H(i)_m": 22.29,
          SD_m: 3750.28,
        },
      ],
    },
    totals: {
      fixed: {
        E_d: 3000.08,
        E_m: 91252.44,
        E_y: 1095029.23,
        "H(i)_d": 3.59,
        "H(i)_m": 109.29,
        "H(i)_y": 1311.5,
        SD_m: 3304,
        SD_y: 39648.06,
        l_aoi: -2.99,
        l_spec: "1.42",
        l_tg: -3.65,
        l_total: -18.47,
      },
    },
  },
  meta: {
    inputs: {
      location: {
        description: "Selected location",
        variables: {
          latitude: {
            description: "Latitude",
            units: "decimal degree",
          },
          longitude: {
            description: "Longitude",
            units: "decimal degree",
          },
          elevation: {
            description: "Elevation",
            units: "m",
          },
        },
      },
      meteo_data: {
        description: "Sources of meteorological data",
        variables: {
          radiation_db: {
            description: "Solar radiation database",
          },
          meteo_db: {
            description:
              "Database used for meteorological variables other than solar radiation",
          },
          year_min: {
            description: "First year of the calculations",
          },
          year_max: {
            description: "Last year of the calculations",
          },
          use_horizon: {
            description: "Include horizon shadows",
          },
          horizon_db: {
            description: "Source of horizon data",
          },
        },
      },
      mounting_system: {
        description: "Mounting system",
        choices: "fixed, vertical_axis, inclined_axis, two_axis",
        fields: {
          slope: {
            description: "Inclination angle from the horizontal plane",
            units: "degree",
          },
          azimuth: {
            description:
              "Orientation (azimuth) angle of the (fixed) PV system (0 = S, 90 = W, -90 = E)",
            units: "degree",
          },
        },
      },
      pv_module: {
        description: "PV module parameters",
        variables: {
          technology: {
            description: "PV technology",
          },
          peak_power: {
            description: "Nominal (peak) power of the PV module",
            units: "kW",
          },
          system_loss: {
            description: "Sum of system losses",
            units: "%",
          },
        },
      },
      economic_data: {
        description: "Economic inputs",
        variables: {
          system_cost: {
            description: "Total cost of the PV system",
            units: "user-defined currency",
          },
          interest: {
            description: "Annual interest",
            units: "%/y",
          },
          lifetime: {
            description: "Expected lifetime of the PV system",
            units: "y",
          },
        },
      },
    },
    outputs: {
      monthly: {
        type: "time series",
        timestamp: "monthly averages",
        variables: {
          E_d: {
            description:
              "Average daily energy production from the given system",
            units: "kWh/d",
          },
          E_m: {
            description:
              "Average monthly energy production from the given system",
            units: "kWh/mo",
          },
          "H(i)_d": {
            description:
              "Average daily sum of global irradiation per square meter received by the modules of the given system",
            units: "kWh/m2/d",
          },
          "H(i)_m": {
            description:
              "Average monthly sum of global irradiation per square meter received by the modules of the given system",
            units: "kWh/m2/mo",
          },
          SD_m: {
            description:
              "Standard deviation of the monthly energy production due to year-to-year variation",
            units: "kWh",
          },
        },
      },
      totals: {
        type: "time series totals",
        variables: {
          E_d: {
            description:
              "Average daily energy production from the given system",
            units: "kWh/d",
          },
          E_m: {
            description:
              "Average monthly energy production from the given system",
            units: "kWh/mo",
          },
          E_y: {
            description:
              "Average annual energy production from the given system",
            units: "kWh/y",
          },
          "H(i)_d": {
            description:
              "Average daily sum of global irradiation per square meter received by the modules of the given system",
            units: "kWh/m2/d",
          },
          "H(i)_m": {
            description:
              "Average monthly sum of global irradiation per square meter received by the modules of the given system",
            units: "kWh/m2/mo",
          },
          "H(i)_y": {
            description:
              "Average annual sum of global irradiation per square meter received by the modules of the given system",
            units: "kWh/m2/y",
          },
          SD_m: {
            description:
              "Standard deviation of the monthly energy production due to year-to-year variation",
            units: "kWh",
          },
          SD_y: {
            description:
              "Standard deviation of the annual energy production due to year-to-year variation",
            units: "kWh",
          },
          l_aoi: {
            description: "Angle of incidence loss",
            units: "%",
          },
          l_spec: {
            description: "Spectral loss",
            units: "%",
          },
          l_tg: {
            description: "Temperature and irradiance loss",
            units: "%",
          },
          l_total: {
            description: "Total loss",
            units: "%",
          },
        },
      },
    },
  },
};

const solar_details = {
  roof_area: 100,
  number_of_panel: 10,
  panelcapacity: 1000,
  solar_potential: 1000,
};

function ResultControlPanel() {
  return (
    <ResultControlPanelStyled>
      <Box
        sx={{
          padding: 1,
        }}
      >
        <Card
          sx={{
            marginBottom: 2,
          }}
        >
          <Typography variant="h6">SOLAR DETAILS</Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconSolarPanel stroke={2} />
            <Typography variant="body1">
              Roof Area: {solar_details?.roof_area} m²
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconCalculator stroke={2} />
            <Typography variant="body1">
              Number of panel: {solar_details?.number_of_panel}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconSatellite stroke={2} />
            <Typography variant="body1">
              Panel Capacity: {solar_details?.panelcapacity} Watt
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <IconSolarPanel2 stroke={2} />
            <Typography variant="body1">
              Solar potential: {solar_details?.solar_potential} KWh
            </Typography>
          </Box>
        </Card>

        <Card>
          <Box>
            <Typography variant="h6">ENERGY DETAILS</Typography>
            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "5px",
                gap: "10px",
              }}
            >
              <Typography>Yearly PV energy production [kWh]: </Typography>
              <Typography>{api_details.outputs.totals.fixed.E_y}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "5px",
                gap: "10px",
              }}
            >
              <Typography>Monthly PV energy production [kWh]: </Typography>
              <Typography>{api_details.outputs.totals.fixed.E_m}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "5px",
                gap: "10px",
              }}
            >
              <Typography>Daily PV energy production [kWh]: </Typography>
              <Typography>{api_details.outputs.totals.fixed.E_d}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "5px",
                gap: "10px",
              }}
            >
              <Typography>Yearly in-plane irradiation [kWh/m²]:</Typography>
              <Typography>
                {api_details.outputs.totals.fixed["H(i)_y"]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "5px",
                gap: "10px",
              }}
            >
              <Typography>Year-to-year variability [kWh]:</Typography>
              <Typography>
                {api_details.outputs.totals.fixed["SD_y"]}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "5px",
                gap: "10px",
                marginBottom: 2,
              }}
            >
              <Typography>Total loss [%]:</Typography>
              <Typography>
                {" "}
                {api_details.outputs.totals.fixed["l_total"]}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box>
            <TickPlacementBars data={api_details} />
          </Box>
        </Card>
      </Box>
    </ResultControlPanelStyled>
  );
}

ResultControlPanel.propTypes = {};

export default memo(ResultControlPanel);
