import arrowLogo from "../assets/cropped_arrow.png"; // Adjust the path if necessary
import { styled } from "@mui/material/styles";

const Logo = styled("img")({
  width: "30px", // Adjust the size as needed
  height: "auto",
});

export default function ArrowLogo() {
  return (
    <Logo src={arrowLogo} alt="Arrow Logo" />
  );
}
