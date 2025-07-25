export interface Celebrity_Details {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
  expanded: number | false;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  setExpanded: (value: number | false) => void;
  updateCelebrityDetails: (value: Celebrity_Details) => void;
  deleteCelebrityDetails: (value: number) => void;
}
