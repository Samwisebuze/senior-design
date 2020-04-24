import React from "react";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props extends DialogProps {
  options: string[];
}

const FormDialog: React.FC<Props> = ({ options = [], onClose, ...rest }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSsh = () => {
    window.open(`http://localhost:8888?hostname=${value}`, "_blank");
  };

  return (
    <Dialog {...rest} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Inspect Host</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select the host machine to SSH into
        </DialogContentText>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Host"
            name="Host"
            value={value}
            onChange={handleChange}
          >
            {options.map(option => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSsh} color="primary" disabled={!value}>
          Go
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
