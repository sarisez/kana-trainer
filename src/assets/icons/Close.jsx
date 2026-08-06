const Close = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>

  </svg>
);

export default Close;