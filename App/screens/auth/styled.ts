import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import styled from "styled-components/native";
export const LogoImage = styled.Image`
  height: 140px;
  margin-bottom: 30px;
  width: 140px;
  margin-top: 20%;
`;

export const StyledGoogleSignInButton = styled(GoogleSigninButton)`
  width: 92%;
  margin-top: 10px;
  border-radius: 20px;
  height: 50px;
`;
