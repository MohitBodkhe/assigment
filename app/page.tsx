"use client";

import "./page.module.css";
import celebrities from "@/celebrities.json";
import { Box, TextField } from "@mui/material";
import UserAccordian from "@/Components/UserAccordian";
import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Celebrity_Details } from "@/Components/UserAccordian/userAccourdian.types";
export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [celebritiesData, setCelebritiesData] = useState(celebrities);
  const [expanded, setExpanded] = useState<number | false>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const updateCelebrityDetails = (updatedCelebrity: Celebrity_Details) =>
    setCelebritiesData((prev) =>
      prev.map((celebrity) => {
        if (celebrity.id === updatedCelebrity.id) {
          return { ...updatedCelebrity, id: celebrity.id };
        }
        return celebrity;
      })
    );

  const deleteCelebrityDetails = (id: number) =>
    setCelebritiesData((prev) =>
      prev.filter((celebrity) => celebrity.id !== id)
    );

  const filteredCelebrities = celebritiesData.filter(
    (celebrity) =>
      celebrity.first.toLowerCase().includes(searchText.toLowerCase()) ||
      celebrity.last.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <TextField
        sx={{
          width: "40%",
          marginTop: "22px",
          "& .MuiOutlinedInput-root": {
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            borderBottomLeftRadius: "12px", // Optional: To round the bottom corners as well
            borderBottomRightRadius: "12px", // Optional: To round the bottom corners as well
          },
        }}
        placeholder="Search user"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {filteredCelebrities.map((celebrity, i) => (
        <Box mt={2} width={"40%"} key={i}>
          <UserAccordian
            {...{
              ...celebrity,
              expanded,
              setExpanded,
              editMode,
              setEditMode,
              updateCelebrityDetails,
              deleteCelebrityDetails,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
