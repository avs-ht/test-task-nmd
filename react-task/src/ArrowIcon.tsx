export const Arrow = ({ direction }: { direction: "asc" | "desc" | null }) => {
  if (!direction) return null;
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      style={{
        marginLeft: "4px",
        transform: direction === "desc" ? "rotate(180deg)" : "none",
        transition: "transform 0.2s ease",
      }}
    >
      {" "}
      <path d="M5 0L10 8.66H0L5 0Z" fill="currentColor" />{" "}
    </svg>
  );
};
