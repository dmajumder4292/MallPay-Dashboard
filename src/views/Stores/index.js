import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Divider,
  Typography,
  Button,
  Card,
  CardContent,
  colors,
  Link
} from '@material-ui/core';
import Page from 'src/components/Page';
import MallCreateModal from './MallCreateModal';
import BaseModal from './BaseModal';
import axios from 'src/utils/axios';
import Results from './Results';
import FilesDropzone from 'src/components/FilesDropzone';
import downloadCsv from 'download-csv';

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
  },
  info: {
    '&:hover': {
      // backgroundColor: colors.grey[50],
      // opacity: 0.5,
      cursor: 'pointer'
    }
  }
}));

const datas = [
  { store_no: '', brand: '', floor: '', image: '' }
];
 
const columns = { store_no: 'store_no', brand: 'brand', floor: 'floor', image: 'image' };

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
      title="Brands"
    >
      <Container maxWidth="lg">
        {/* <Typography variant="overline">
          Components
        </Typography> */}
        <Typography
          gutterBottom
          variant="h3"
        >
          Stores
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.section}>
          <Card>
            <CardContent>
              <FilesDropzone />
            </CardContent>
          </Card>
          <Typography
            className={classes.info}
            color="textSecondary"
            variant="body1"
          >
            Download template
            {' '}
            <Link underline="always" onClick={() => downloadCsv(datas, columns, 'stores_sample.csv')}>here</Link>
            {' '}
          </Typography>
        </div>
        {/* {customers && (
          <Results
            className={classes.results}
            customers={customers}
          />
        )} */}
      </Container>
    </Page>
  );
}

export default Modals;
