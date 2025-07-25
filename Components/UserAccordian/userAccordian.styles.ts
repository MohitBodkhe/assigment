import { SxProps, Theme } from "@mui/material";

export const HeaderContainer: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
};

export const DetailsContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
};

export const PrimaryDetailsContainer: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  flexWrap: "wrap",
};

export const FooterContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-end",
};
export const HeaderText: SxProps<Theme> = {
  fontSize: 18,
  fontWeight: 500,
};

export const ContentText: SxProps<Theme> = {
  fontSize: 14,
};
