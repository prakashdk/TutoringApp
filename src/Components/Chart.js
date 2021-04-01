import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import BarChart from 'react-bar-chart';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function Chart() {
    const [users,setUsers]=useState({});
    const history = useHistory();
    const classes = useStyles();
    const [render,setRender]=useState(false);

    const [data,setData] = useState([
        {text: 'Questions', value: 0}, 
        {text: 'Answers', value: 0},
        {text: 'Rating', value: 0}, 
      ]);

    

  useEffect(() => {
    fetch("http://localhost:6065/chart")
      .then((res) => res.json())
      .then((row) => {
          let sample=[
            {text: 'Questions', value: row.questions}, 
            {text: 'Answers', value: row.answers},
            {text: 'Rating', value: row.rating}, 
          ];
          
          setData(sample);
          
      })
      .catch((e) => {
        console.log(e);
      });
  }, [render]);
  
  const addUser=() => {
    history.push("/admin");
  };
  return (
    <>
      <div>
        <h1></h1>
        <div className="button">
          <Button variant="outlined" color="primary" onClick={addUser}>
            Back
          </Button>
        </div>
        <div className="header">
          <h1>Welcome admin</h1>
        </div>
        <div>
        <BarChart ylabel='Count'
                width={500}
                  margin={{top: 20, right: 20, bottom: 30, left: 40}}
                  height={500}
                  data={data}
                  />
        </div>
      </div>
    </>
  );
}
