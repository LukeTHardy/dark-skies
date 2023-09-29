import "./StationTracker.css";

export const StationTracker = () => {
  return (
    <div className="widget-container">
      <iframe
        className="widget"
        src="https://spotthestation.nasa.gov/widget/widget2.cfm?theme=2"
        width="310"
        height="450"
        frameBorder="0"
        title="Station Tracker"
      ></iframe>
    </div>
  );
};
