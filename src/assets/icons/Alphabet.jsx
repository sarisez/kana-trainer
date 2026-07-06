const Alphabet = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path d="M12 3v18"/>
    <path d="M3 12h18"/>
    <rect x="3" y="3" width="18" height="18" rx="2"/>

  </svg>
);

export default Alphabet;