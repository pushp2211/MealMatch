export function getPinConfig(item, isSelected) {
  switch (item.type) {
    case "primary": // current user
      return {
        color: "#2563eb", // blue
        size: 42,
        zIndex: 50,
      };

    case "destination": // active pickup target
      return {
        color: "#dc2626", // red
        size: 30,
        zIndex: 60,
      };

    case "provider":
      return {
        color: item.verified ? "#16a34a" : "#dc2626",   //verfied -> red, not verified -> green
        size: isSelected ? 36 : 32,
        zIndex: isSelected ? 40 : 20,
      };

    case "seeker":
      return {
        color: "#7c3aed", // purple
        size: 36,
        zIndex: 20,
      };

    default:
      return {
        color: "#6b7280", // gray
        size: 34,
        zIndex: 10,
      };
  }
}
