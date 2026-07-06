const Training = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path d="m6 16 6-12 6 12"/>
    <path d="M8 12h8"/>
    <path d="m16 20 2 2 4-4"/>

  </svg>
);

export default Training;