import React, { useRef, useState, useEffect } from "react";
import { convertTimeHumanFormat } from "../../features/utils/functions";

const SeekSlider = ({ value, max = 100, min = 0, onChange }) => {
  const [tooltipStyles, setTooltipStyles] = useState({
    display: "none",
  });
  const [sliderValue, setSliderValue] = useState(value);
  const [progressValue, setProgressValue] = useState(value);
  const [tooltipValue, setTooltipValue] = useState(value);
  const tooltip = useRef();
  const sliderRef = useRef();

  const progress = ((progressValue - min) * 100) / (max - min) + "% 100%";

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

  const handleChange = (val) => {
    setSliderValue(val);
    setProgressValue(val);
    if (!onChange || typeof onChange !== "function") return;
    onChange(val);
  };

  useEffect(() => {
    setProgressValue(value);
    setSliderValue(value);
  }, [value]);

  const handleKeyPress = (e) => {
    e.preventDefault();
    if (e.code === "ArrowRight") {
      handleChange(sliderValue + 5);
    } else if (e.code === "ArrowLeft") {
      handleChange(sliderValue - 5);
    }
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
        onChange={(e) => handleChange(e.target.value)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={sliderRef}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SeekSlider;
