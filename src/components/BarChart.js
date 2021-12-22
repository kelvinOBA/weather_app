import { forwardRef, useState, useImperativeHandle } from "react";
import Popover from "@mui/material/Popover";
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from "victory";

const BarChart = forwardRef((props, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useImperativeHandle(ref, () => ({
    openPopOver(e) {
      handleClick(e);
    },
  }));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryBar
            data={props.chartData.slice(0, 5)}
            // data accessor for x values
            x="hour"
            // data accessor for y values
            y="temp"
          />
          <VictoryLabel desc="an svg coordinate label" />
        </VictoryChart>
      </Popover>
    </div>
  );
});

export default BarChart;
