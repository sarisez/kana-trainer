const BothIcon = ({ title, titleId, ...props }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}

    <path
      d="M8.9 17.3C13.5392 17.3 17.3 13.5392 17.3 8.9C17.3 4.26081 13.5392 0.5 8.9 0.5C4.26081 0.5 0.5 4.26081 0.5 8.9C0.5 13.5392 4.26081 17.3 8.9 17.3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M16.1 24.5C20.7392 24.5 24.5 20.7392 24.5 16.1C24.5 11.4608 20.7392 7.7 16.1 7.7C11.4608 7.7 7.7 11.4608 7.7 16.1C7.7 20.7392 11.4608 24.5 16.1 24.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BothIcon;