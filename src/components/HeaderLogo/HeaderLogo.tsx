import LogoImg from "../../assets/logo.png";
import OwlElectronics from "../../assets/owl-electronics.png";
import { Box } from "@twilio-paste/core";

export const HeaderLogo = () => (
  <Box display="flex" alignItems="center">
    <Box height="20px" as="img" src={LogoImg} />
    <Box height="20px" width="20px" as="div"/>
    <Box height="20px" as="img" src={OwlElectronics} />
  </Box>
);
