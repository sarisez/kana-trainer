const ArrowRight = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"

    stroke="currentColor"
    strokeWidth="1.5"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path d="m9 18 6-6-6-6"/>
    
  </svg>
);

export default ArrowRight;