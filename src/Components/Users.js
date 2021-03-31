import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
export default function Users() {
    const [users,setUsers]=useState([]);
    const history = useHistory();
    const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:6065/allUsers")
      .then((res) => res.json())
      .then((row) => {
          setUsers(row);
          
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const setAdmin = (data) => {
    fetch("http://localhost:6065/addAdmin", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((d) => {
        if(d==="added"){
            alert(data.email+" is an admin");
        }
        else{
            alert("Failed try again");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
  };
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
            <ul>
            {users.map((a)=>(
                <>
                <Card className={classes.root}>
                <CardContent>
                  
                  <Typography variant="h5" component="h2">
                      {a.email}
                  </Typography>
                  
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>setAdmin(a)}>Make as Admin</Button>
                </CardActions>
              </Card>
              <h1></h1>
              </>
            ))}
            </ul>
        </div>
      </div>
    </>
  );
}
