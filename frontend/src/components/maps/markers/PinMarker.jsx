const darkenColor = (hex, amount = 0.25) => {
    let col = hex.replace("#", "");

    if (col.length === 3) {
        col = col
            .split("")
            .map((c) => c + c)
            .join("");
    }

    const num = parseInt(col, 16);

    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));

    return `rgb(${r}, ${g}, ${b})`;
};

const PinMarker = ({
    color = "#3b82f6",
    size = 36,
    active = false,
}) => {

    const outlineColor = darkenColor(color, active ? 0.35 : 0.25);
    return (
        <svg
            width={size}
            height={size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: active ? "scale(1.15)" : "scale(1)",
                transition: "transform 0.2s ease",
                filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.25))",
            }}
        >
            {/* Pin body with outline*/}
            <path
                d="M12 0C6.9 0 2.8 4.1 2.8 9.2C2.8 16.3 12 32 12 32C12 32 21.2 16.3 21.2 9.2C21.2 4.1 17.1 0 12 0Z"
                fill={color}
                stroke={outlineColor}
                strokeWidth={active ? 2 : 1.5}
            />

            {/* Inner circle */}
            <circle
                cx="12"
                cy="9.5"
                r="4"
                fill="rgba(255,255,255,0.85)"
            />

            {/* Active center */}
            {active && (
                <circle
                    cx="12"
                    cy="9.5"
                    r="2"
                    fill="rgba(0,0,0,0.35)"
                />
            )}
        </svg>
    );
};

export default PinMarker;
