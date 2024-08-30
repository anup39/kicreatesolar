import PropTypes from "prop-types";
import { memo } from "react";

// material-ui
import { Divider, Typography, Box, Card } from "@mui/material";
import {
  IconCalculator,
  IconSolarPanel,
  IconSolarPanel2,
  IconSatellite,
  IconSquareRoundedX,
  IconArrowsDiagonalMinimize2,
  IconArrowsMaximize,
} from "@tabler/icons-react";

// project-import
import ResultControlPanelStyled from "../../../../../ui-component/third-party/map/ResultControlPanelStyled";
import TickPlacementBars from "./barchart";

// ==============================|| VIEWPORT ANIMATION - CONTROL ||============================== //

function ResultControlPanel({
  minimizeResult,
  onShowResult,
  onMinimizeResult,
  solar_details,
  api_details,
}) {
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="h6">SOLAR DETAILS</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              {minimizeResult ? (
                <IconArrowsMaximize
                  onClick={() => {
                    onMinimizeResult(false);
                  }}
                  color="#40ADAB"
                  stroke={2}
                />
              ) : (
                <IconArrowsDiagonalMinimize2
                  onClick={() => {
                    onMinimizeResult(true);
                  }}
                  color="#40ADAB"
                  stroke={2}
                />
              )}

              <IconSquareRoundedX
                onClick={() => {
                  onShowResult(false);
                }}
                color="#D3542C"
                stroke={2}
              />
            </Box>
          </Box>
          <Divider />
          {!minimizeResult && (
            <Box>
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
            </Box>
          )}
        </Card>
        {!minimizeResult && (
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
                <Typography>
                  {api_details?.outputs?.totals?.fixed?.E_y}
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
                <Typography>Monthly PV energy production [kWh]: </Typography>
                <Typography>
                  {api_details?.outputs?.totals?.fixed?.E_m}
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
                <Typography>Daily PV energy production [kWh]: </Typography>
                <Typography>
                  {api_details?.outputs?.totals?.fixed?.E_d}
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
                <Typography>Yearly in-plane irradiation [kWh/m²]:</Typography>
                <Typography>
                  {api_details?.outputs?.totals?.fixed["H(i)_y"]}
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
                  {api_details?.outputs?.totals?.fixed["SD_y"]}
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
                  {api_details?.outputs?.totals?.fixed["l_total"]}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box>
              <TickPlacementBars data={api_details} />
            </Box>
          </Card>
        )}
      </Box>
    </ResultControlPanelStyled>
  );
}

ResultControlPanel.propTypes = {
  minimizeResult: PropTypes.bool,
  onShowResult: PropTypes.func,
  onMinimizeResult: PropTypes.func,
};

export default memo(ResultControlPanel);
