import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import moment from 'moment';
import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating'
import './RegisterForm.css';
import { Typography, Button } from "@material-ui/core";

export const RegisterForm = () => {
  const today = moment();
  const [selectedDate, setDateChange] = useState(today);
  const handleDateChange = (date: any) => {
    setDateChange(date);
  }
  return (
    <div className="form">
      <div className="input">
        <TextField id="author" label="Autor"></TextField>
      </div>
      <div className="input">
        <TextField id="title" label="Título"></TextField>
      </div>
      <div className="input">
        <DatePicker
          label="Fecha"
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling
        />
      </div>
      <div className="rating">
        <Typography component="legend" color="textSecondary" className="rate_label">Puntuación</Typography>
        <Rating value={2}></Rating>
      </div>
      <Button variant="contained" color="primary" className="add_button">Añadir</Button>
    </div>
  );
};