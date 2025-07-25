import {
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Typography,
  FormLabel,
  IconButton,
  Accordion,
} from "@mui/material";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import { Celebrity_Details } from "../userAccourdian.types";
import {
  ContentText,
  DetailsContainer,
  FooterContainer,
  HeaderContainer,
  HeaderText,
  PrimaryDetailsContainer,
} from "../userAccordian.styles";
interface ViewProps extends Celebrity_Details {
  handleEdit: (value: boolean) => void;
  calculateAge: (value: string) => number;
  openConfirmation: (value: number) => void;
  handleChange: Function;
}

export function ViewCelebSummary(props: ViewProps) {
  return (
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Box sx={HeaderContainer}>
        <Avatar
          sx={{ marginRight: "10px" }}
          alt="Remy Sharp"
          src={props.picture}
        />
        <Typography ml={1} sx={HeaderText}>
          {props.first} {props.last}
        </Typography>
      </Box>
    </AccordionSummary>
  );
}

export function ViewCelebDetails(props: ViewProps) {
  return (
    <AccordionDetails>
      <Box sx={DetailsContainer}>
        <Box
          sx={{
            ...PrimaryDetailsContainer,
            justifyContent: "flex-start",
          }}
          justifyContent="space-between"
        >
          <Box sx={{ marginRight: "50px" }}>
            <FormLabel>Age</FormLabel>
            <Typography sx={ContentText}>
              {props.calculateAge(props.dob)} years
            </Typography>
          </Box>
          <Box sx={{ marginRight: "50px" }}>
            <FormLabel>Gender</FormLabel>
            <Typography sx={ContentText}>
              {props.gender.charAt(0).toUpperCase() + props.gender.slice(1)}
            </Typography>
          </Box>
          <Box>
            <FormLabel>Country</FormLabel>
            <Typography sx={ContentText}>{props.country}</Typography>
          </Box>
        </Box>

        <Box mt={3}>
          <FormLabel>Description</FormLabel>
          <Typography sx={{ ...ContentText, marginTop: "5px" }}>
            {props.description}
          </Typography>
        </Box>
      </Box>
      <Box mt={1} sx={FooterContainer}>
        <IconButton onClick={() => props.openConfirmation(props.id)}>
          <Delete color="error" />
        </IconButton>

        <IconButton
          sx={{
            opacity: props.calculateAge(props.dob) >= 18 ? 1 : 0.5,
            pointerEvents:
              props.calculateAge(props.dob) >= 18 ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
          onClick={() => props.handleEdit(true)}
          disabled={props.calculateAge(props.dob) < 18}
        >
          <Edit color="info" />
        </IconButton>
      </Box>
    </AccordionDetails>
  );
}
