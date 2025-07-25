import React, { useState } from "react";

import { Celebrity_Details } from "./userAccourdian.types";
import ConfirmationDialog from "../ConfirmationDiaglog";
import { Accordion, SelectChangeEvent } from "@mui/material";
import EditCeleb from "./ui/Edit";
import { ViewCelebDetails, ViewCelebSummary } from "./ui/View";
interface UserAccordianProps extends Celebrity_Details {
  fullName: string;
}
export default function UserAccordion(props: Celebrity_Details) {
  const initialProps = {
    ...props,
    fullName: props.first + " " + props.last,
  };
  const [editedDetails, setEditedDetails] = useState<UserAccordianProps>({
    ...initialProps,
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [holdId, setID] = React.useState<number | undefined>(undefined);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (props.editMode) return;
      props.setExpanded(isExpanded ? panel : false);
    };

  const handleEdit = (value: boolean) => props.setEditMode(value);

  const handleCancel = () => {
    handleEdit(false);
    setEditedDetails({ ...initialProps });
    setHasChanges(false);
  };

  const handleSave = () => {
    if (isDetailsValid()) {
      const lastNameArr = editedDetails.fullName?.split(" ");
      lastNameArr?.shift();
      props.updateCelebrityDetails({
        ...editedDetails,
        first: editedDetails.fullName.split(" ")[0],
        last: lastNameArr
          .reduce((init, value) => init + value + " ", "")
          .trim(),
      });
      handleEdit(false);
      setHasChanges(false);
    }
  };

  const openConfirmation = (id: number) => {
    setID(id);
    setOpen(true);
  };
  const isDetailsValid = () => {
    const {
      fullName = "",
      dob = "",
      gender = "",
      country = "",
      description = "",
    } = editedDetails;
    let errorString = "";
    // note: just taken care of invalid date validation. can also addon min age validation here
    if (!fullName) errorString = "name should not be empty! \n";
    if (isNaN(new Date(dob).valueOf())) errorString += "return valid date! \n";
    if (!gender) errorString += "please select valid gender! \n";
    if (!country) errorString += "country should not be empty! \n";
    if (!description) errorString += "description should not be empty! \n";

    if (errorString.length > 0) {
      alert(errorString);
      return false;
    }

    return true;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const isValueChanged =
      value !== editedDetails[name as keyof UserAccordianProps];

    if (name === "country") {
      checkCountry(name, value);
      return;
    }

    if (isValueChanged) {
      setHasChanges(true);
      setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    } else {
      setHasChanges(false);
    }
  };

  const checkCountry = (name: string, value: string) => {
    if (/\d/.test(value)) {
      alert("Numbers are not allowed in country");
      return false;
    }

    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    return true;
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const isValueChanged = value !== editedDetails["gender"];
    if (isValueChanged) {
      setHasChanges(true);
      setEditedDetails((prevDetails) => ({ ...prevDetails, gender: value }));
    } else {
      setHasChanges(false);
    }
  };

  function calculateAge(dob: string) {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const viewProps = {
    ...props,
    calculateAge,
    handleChange,
    openConfirmation,
    handleEdit,
  };
  return (
    <>
      {props.editMode && props.expanded === props.id ? (
        <Accordion
          expanded={props.id == props.expanded}
          onChange={handleChange(props.id)}
          sx={{
            border: "1px solid grey",
            borderBottomLeftRadius: "10px !important",
            borderBottomRightRadius: "10px !important ",
            boxShadow: "none",
            borderTopLeftRadius: "10px !important",
            borderTopRightRadius: "10px !important",
            padding: "5px",
            overflow: "visible",
          }}
        >
          <EditCeleb
            {...{
              ...editedDetails,
              calculateAge,
              handleChange,
              openConfirmation,
              handleCancel,
              handleSave,
              handleInputChange,
              handleSelectChange,
              hasChanges,
            }}
          />
        </Accordion>
      ) : (
        <Accordion
          expanded={props.id === props.expanded}
          onChange={handleChange(props.id)}
          sx={{
            border: "1px solid grey",
            borderBottomLeftRadius: "10px !important",
            borderBottomRightRadius: "10px !important ",
            boxShadow: "none",
            borderTopLeftRadius: "10px !important",
            borderTopRightRadius: "10px !important",
            padding: "5px",
            overflow: "visible",
          }}
        >
          <ViewCelebSummary {...viewProps} />
          <ViewCelebDetails {...viewProps} />
        </Accordion>
      )}

      <ConfirmationDialog
        description="Are you sure you want to delete?"
        confirmButtonName="Delete"
        dialogState={{ open, setOpen }}
        onConfirm={() => holdId && props.deleteCelebrityDetails(holdId)}
      />
    </>
  );
}
