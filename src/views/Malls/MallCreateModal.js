import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  TextField,
  Switch,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

function MallCreateModal({
  open, onClose, customer, className, ...rest
}) {
  const classes = useStyles();
  const [initValues, setInitValues] = useState({
    ...customer
  })
  const [values, setValues] = useState({
    ...customer
  });

  const handleFieldChange = (event) => {
    event.persist();
    setValues((currentValues) => ({
      ...currentValues,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    }));
  };

  const handleSubmit = () => {
    console.log(values);
    setValues(initValues)
    onClose();
  }

  if (!open) {
    return null;
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form>
          <CardHeader title="Create Mall" />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleFieldChange}
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleFieldChange}
                  value={values.city}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="No. of Stores"
                  name="numStores"
                  onChange={handleFieldChange}
                  value={values.numStores}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Parking Capacity"
                  name="parkingCap"
                  onChange={handleFieldChange}
                  value={values.parkingCap}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Parking Discount"
                  name="parkingDis"
                  onChange={handleFieldChange}
                  value={values.parkingDis}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleFieldChange}
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  onChange={handleFieldChange}
                  value={values.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Image Url"
                  name="url"
                  onChange={handleFieldChange}
                  value={values.url}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button onClick={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              onClick={handleSubmit}
              variant="contained"
            >
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
}

MallCreateModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

MallCreateModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default MallCreateModal;
