import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText, TextareaAutosize } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Add() {
  const [helper, setHelper] = useState("");
  const [question,setQuestion]=useState("");
  const classes = useStyles();
  const history=useHistory();

  const handleQuestion = () => {
    if (isEmpty(question)) {
      setHelper("Enter Question");
    } else {
      fetch(
        "http://localhost:6065/add?email=" +
          sessionStorage.getItem("email") +
          "&question=" +
          question 
      )
        .then((res) => res.text())
        .then((r) => {
          if(r==="added"){
            alert("successfully posted");
            history.push("/home");
          }
          else{
            setHelper("Failed/Unable to post Try again");
          }
        })
        .catch((e) => {
          setHelper("Failed/Unable to post Try again");
          console.log(e);
        });
    }
  };

  const isEmpty = (a) => {
    return a === "" || a === null || a === undefined || a === "0" || a === 0;
  };

  return (
    <>
      <div className="header">
        <h1>Add Question</h1>  
      </div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form className={classes.form}>
            
            <TextareaAutosize
              aria-label="minimum height" 
              rowsMin={5}
              style={{width:"390px"}}
              placeholder="Enter Question"
              onFocus={() => {
                setHelper("");
              }}
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
              }}
            />
            <FormHelperText error>{helper}</FormHelperText>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleQuestion}
            >
              {"Post"}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
