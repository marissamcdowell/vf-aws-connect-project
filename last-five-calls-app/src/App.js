import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  }
});

function App() {
  const [last5calls, setLast5Calls] = useState('');

  // this should be an env variable in real life, hooked up to cdk deployment output value 
  // should point to an endpoint returning `last5calls.js` lambda function
  const endpoint = 'https://3kljlyids7.execute-api.us-east-1.amazonaws.com/prod';

  useEffect(() => {
    getLast5Calls();
  }, []);

  const getLast5Calls = async () => {
    try {
      const resp = await axios.get(endpoint);
      console.log(resp.data);
      setLast5Calls(resp.data.Items)
    } catch (err) {
      console.error(err);
    }
  };

  const classes = useStyles();
  return (
    <div className="App">
      <h2>Call in at: +1 866-872-4191</h2>
      <h3>Last 5 callers</h3>
      {last5calls && 
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Caller's Number</TableCell>
              <TableCell>Vanity Options</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {last5calls && last5calls.map((callerRow) => (
              <TableRow key={`${callerRow.PHONE_NUMBER}-${callerRow.TIMESTAMP}`}>
                <TableCell>
                  {callerRow.PHONE_NUMBER}
                </TableCell>
                <TableCell>
                  <ul className={classes.list}>
                    {callerRow.VANITY_OPTIONS && callerRow.VANITY_OPTIONS.map((opt, i) => {                  
                      return (<li>{opt}</li>)
                    })}
                  </ul>
                </TableCell>
                <TableCell>
                  {new Date(callerRow.TIMESTAMP).toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </div>
  );
}

export default App;
