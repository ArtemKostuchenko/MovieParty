import React, { useRef, useState } from "react";

const VolumeSlider = ({
  value,
  min = 0,
  max = 1,
  scrollable = false,
  dark = false,
  onChange,
}) => {
  const [tooltipStyles, setTooltipStyles] = useState({
    display: "none",
  });
  const [tooltipValue, setTooltipValue] = useState(value);
  const [sliderValue, setSliderValue] = useState(value);
  const tooltip = useRef();
  const sliderRef = useRef();

  const progress = ((sliderValue - min) * 100) / (max - min) + "% 100%";

  const handleMouseMove = (e) => {
    const slider = e.target;
    const { width, left } = slider.getBoundingClientRect();
    const position = (e.clientX - left) / width;
    const tooltipWidth = tooltip.current.offsetWidth;
    const tooltipPosition = position * 100 - (tooltipWidth / width) * 50;

    const newValue = Math.round(position * (max - min) + min);
    setTooltipValue(newValue);

    setTooltipStyles({
      left: `${tooltipPosition}%`,
      top: "-30px",
    });
  };

  const handleMouseLeave = () => {
    setTooltipStyles({ display: "none" });
  };

  const handleWheel = (e) => {
    if (scrollable) {
      const delta = e.deltaY < 0 ? 10 : -10;
      let newValue = parseInt(sliderValue) + parseInt(delta);
      newValue = Math.max(min, Math.min(max, newValue));
      setSliderValue(newValue);
      if (!onChange || typeof onChange !== "function") return;
      onChange(newValue);
    }
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
        className={`seek-slider${dark ? " dark" : ""}`}
        style={{ backgroundSize: progress }}
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleChange}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        ref={sliderRef}
      />
    </div>
  );
};

export default VolumeSlider;
