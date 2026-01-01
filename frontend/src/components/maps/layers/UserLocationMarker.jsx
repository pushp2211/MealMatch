import { Marker } from "react-map-gl/mapbox";

const UserLocationMarker = ({
  location,
  heading = 0,
  isNavigating = false,
}) => {
  if (!location) return null;
  // Animation for the pulse
  const animationStyle = `
    @keyframes nav-pulse {
      0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
      70% { box-shadow: 0 0 0 15px rgba(37, 99, 235, 0); }
      100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
    }
  `;

  // styles
  const styles = {
    // Container handles the rotation
    container: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      // rotate the whole container based on heading
      transform: `rotate(${heading}deg)`,
      transition: "transform 0.3s ease-out", 
    },
    // The "Puck" (Blue Circle)
    puck: {
      width: "24px",
      height: "24px",
      backgroundColor: "#2563eb", // Blue-600
      borderRadius: "50%",
      border: "3px solid white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      // Apply pulse animation only when navigating
      animation: isNavigating ? "nav-pulse 2s infinite" : "none",
    },
    // arrow inside puck
    arrow: {
      width: "14px",
      height: "14px",
      marginTop: "-2px", 
    },
    // Fallback "Dot" for non-navigation mode
    browseDot: {
      width: "20px",
      height: "20px",
      backgroundColor: "#2563eb",
      border: "3px solid black",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    }
  };

  return (
    <>
      <style>{animationStyle}</style>

      <Marker
        longitude={location.lng}
        latitude={location.lat}
        anchor="center"
      >
        {isNavigating ? (
          // NAVIGATION MODE: ROTATING PUCK
          <div style={styles.container}>
            <div style={styles.puck}>
              {/* White Navigation Arrow */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                style={styles.arrow}
              >
                <path
                  d="M12 2L19 21L12 17L5 21L12 2Z" 
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ) : (
          // BROWSE MODE: SIMPLE DOT
          <div style={styles.browseDot} />
        )}
      </Marker>
    </>
  );
};

export default UserLocationMarker;