import React, { useRef, useState } from "react";
import { convertTimeHumanFormat } from "../../features/utils/functions";

const SeekSlider = ({ value, max = 100, min = 0, onChange }) => {
  const [tooltipStyles, setTooltipStyles] = useState({
    display: "none",
  });
  const [sliderValue, setSliderValue] = useState(value);
  const [tooltipValue, setTooltipValue] = useState(value);
  const tooltip = useRef();
  const sliderRef = useRef();

  const progress = ((value - min) * 100) / (max - min) + "% 100%";

  const handleMouseMove = (e) => {
    const slider = e.target;
    const { width, left } = slider.getBoundingClientRect();
    const position = (e.clientX - left) / width;
    const tooltipWidth = tooltip.current.offsetWidth;
    const tooltipPosition = position * 100 - (tooltipWidth / width) * 50;

    const newValue = Math.round(position * (max - min) + min);
    setTooltipValue(convertTimeHumanFormat(newValue));

    setTooltipStyles({
      left: `${tooltipPosition}%`,
      top: "-30px",
    });
  };

  const handleMouseLeave = () => {
    setTooltipStyles({ display: "none" });
  };

  const handleChange = (e) => {
    setSliderValue(e.target.value);
    if (!onChange || typeof onChange !== "function") return;
    onChange(e.target.value);
  };

  return (
    <div className="seek-slider-container">
      <div className="slider-tooltip" style={tooltipStyles} ref={tooltip}>
        {tooltipValue}
      </div>
      <input
        type="range"
        className={`seek-slider`}
        style={{ backgroundSize: progress }}
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleChange}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        defaultValue={value}
        ref={sliderRef}
      />
    </div>
  );
};

export default SeekSlider;
