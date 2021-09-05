import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Divider,
  Typography,
  Button,
  Card,
  CardContent,
  colors
} from '@material-ui/core';
import Page from 'src/components/Page';
import MallCreateModal from './MallCreateModal';
import BaseModal from './BaseModal';
import axios from 'src/utils/axios';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  section: {
    '& + &': {
      marginTop: theme.spacing(5),
    },
    marginBottom: '20px'
  }
}));

function Modals() {
  const classes = useStyles();
  const [openBase, setOpenBase] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      axios.get('/api/management/customers').then((response) => {
        if (mounted) {
          setCustomers(response.data.customers);
        }
      });
    };

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      className={classes.root}
      title="Malls"
    >
      <Container maxWidth="lg">
        {/* <Typography variant="overline">
          Components
        </Typography> */}
        <Typography
          gutterBottom
          variant="h3"
        >
          Malls
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.section}>
          {/* <Card>
            <CardContent> */}
              <Button
                color="primary"
                onClick={() => setOpenCustomer(true)}
                variant="contained"
              >
                Create New Mall
              </Button>
            {/* </CardContent>
          </Card> */}
          <MallCreateModal
            customer={{
              email: '',
              name: '',
              city: '',
              numStores: '',
              parkingCap: '',
              parkingDis: '',
              phone: '',
              url: ''
            }}
            onClose={() => setOpenCustomer(false)}
            open={openCustomer}
          />
        </div>
        {customers && (
          <Results
            className={classes.results}
            customers={customers}
          />
        )}
      </Container>
    </Page>
  );
}

export default Modals;
