import { Button as ButtonMui, SxProps } from "@mui/material";

type ButtonProps = {
  children: React.ReactNode;
  styles?: SxProps;
};
const Button: React.FC<ButtonProps> = ({ children, styles }) => {
  const defaultStyles: SxProps = {
    color: "#fff",
    background: "#ffa9a9",
    fontSize: "14px",
    borderRadius: "20px",
    textTransform: "capitalize",
  };
  return <ButtonMui sx={{ ...defaultStyles, ...styles }}>{children}</ButtonMui>;
};
export default Button;
