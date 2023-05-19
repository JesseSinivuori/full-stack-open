const Button = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) => (
  <button type="button" onClick={handleClick}>
    {text}
  </button>
);

export default Button;
