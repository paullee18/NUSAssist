import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon, IconButton } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { addToDB, getTaskEntries, deleteFromDB, editTask } from "../../services/taskManagerServices";
 
const Todo = (props) => {
 const { uid, tokenPromise } = props;
 const [showForm, setshowform] = useState(false);
 const [showNew, setshowNew] = useState(true);
 const [showDelete, setshowDelete] = useState(true);
 const [toggleSubmit, settoggleSubmit] = useState(true);
 const [isEditItem, setisEditItem] = useState(null);
 const [showList, setshowList] = useState(true);
 const [editMessage, seteditMessage] = useState(false);
 const [deleteMessage, setdeleteMessage] = useState(false);
 const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
//  const [isCompleted, setisCompleted] = useState(false);
 const [inputTitle, setinputTitle] = useState("");
 const [inputDesc, setinputDesc] = useState("");
 const [inputDeadline, setInputDeadline] = useState(null);

const [ items, setitems ] = useState([]);

useEffect(() => {
  const fetchEntries = async (uid) => {
    const fetchedEntries = await getTaskEntries(uid, tokenPromise);
    setitems(fetchedEntries.sort(function(task1,task2){return new Date(task2.date)- new Date(task1.date)}));
    if (items.length === 0) {
      setshowList(false)
    } else {
      setshowList(true)
    }
  }
  fetchEntries(uid);

}, [items]);

if (items === []) {
  return null;
}
 
 //   HANDLING INPUT FIELDS
 const handleInput = (e) => {
   setinputTitle(e.target.value);
 };
 const handleInputdesc = (e) => {
   setinputDesc(e.target.value);
 };
 const handleComplete = (index) => {
   const toUpdate = items.find((elem) => {
    return index === elem.id
   });
  //  setisCompleted(!toUpdate.completed);
   setisEditItem(index);
   console.log(toUpdate);
 }
 const handleInputDeadline = (newDeadline) => {
  setInputDeadline(newDeadline);
 }

 //   HANDLING INPUT FIELDS
 
 //   SUBMITTING FORM
 const handleSubmit = (e) => {
   setshowList(true);
   setshowNew(true);
 
   e.preventDefault();
   if (!inputTitle ) {
     alert("Please fill in title");
     showList(false);
   } else if (inputTitle && !toggleSubmit) {

       items.map((elem) => {
         if (elem._id === isEditItem) {
           editTask(uid, elem._id, inputTitle, inputDesc, elem.completed, elem.date, inputDeadline, tokenPromise);
           return { ...elem, task: inputTitle, desc: inputDesc };
         }
         return elem;
       }
     );
 
     setinputTitle("");
     setinputDesc("");
     setInputDeadline(null);
     settoggleSubmit(true);
     setshowform(false);
     setshowDelete(true);
    //  setisCompleted(false);
   } else {

     addToDB(inputTitle, inputDesc, inputDeadline, uid, tokenPromise);

     setinputTitle("");
     setinputDesc("");
     setshowform(false);
   }
 };
 //   SUBMITTING FORM
 
 //   DELETE
 const handleDelete = (index) => {
   deleteFromDB(uid, index, tokenPromise);
   //setdeleteMessage(true);
 
   setTimeout(() => {
     setdeleteMessage(false);
   }, 3000);

   setdeleteMessagesuccess(false);
 };
 //   DELETE
 
 //   EDIT
 const handleEdit = (_id) => {
  //  setshowList(false);
   setshowDelete(false);
   setshowNew(false);
   setshowform(true);
  //  setisCompleted(false);
 
   settoggleSubmit(false);
   let newEditItem = items.find((elem) => {
     return elem._id === _id;
   });
   setinputTitle(newEditItem.task);

   setinputDesc(newEditItem.desc);
   setInputDeadline(newEditItem.deadline)
   // setshowDelete(true)
 
   setisEditItem(_id);
 };
 //   EDIT
 
 // ADD NEW TASK
 const handleAdd = () => {
   setshowform(true);
   setshowList(true);
   setshowNew(false);
  //  setisCompleted(false);
 };

 // Collapse add form
 const handleBack = () => {
  setshowform(false);
  setshowList(true);
  setshowNew(true);
 //  setisCompleted(false);
};
 // ADD NEW TASK
 return (
   <>
     {showNew ? (
       <Container>
         <div className="col-12 text-end">
         <Box m={2} display='flex' justifyContent="center" alignItems="center"> 
           <Button variant="contained" onClick={handleAdd} >
           <span  className="font-link">
           Add New Task
           </span>
           </Button>
         </Box>
         </div>
       </Container>
     ) : (
      <Container>
         <div className="col-12 text-end">
         <Box m={2} display='flex' justifyContent="center" alignItems="center"> 
           <Button variant="contained" onClick={handleBack} >
           <span  className="font-link">
           Back
           </span>
           </Button>
         </Box>
         </div>
       </Container>
     )}
 
     {showForm ? (
            <Paper elevation={3} style={{ padding: 30, margin: 'auto', marginTop: 10, marginBottom: 10 , width: 800, height: 400}} alignItems="center"
                justifyContent="center">
                <Grid 
                    container
                    spacing={3}
                    rowSpacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                >
            {/* <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded"> */}
              {/* <div className="row">
                <div className="text-center"> */}
                <Grid item xs={12}>
                  <h2 className="font-link">{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
                </Grid>
                {/* </div> */}
                <Grid item xs={12}>

                <form className="col-12 p-2" onSubmit={handleSubmit}>
                <Grid 
                    container
                    spacing={3}
                    rowSpacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                >
                  {/* <label htmlFor="Title" className="my-2 font-link" >
                    Enter Title
                  </label> */}
                  {/* <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    className="w-100 my-1 p-2 font-link"
                    onChange={handleInput}
                    value={inputTitle}
                  /> */}
                  <Grid item xs={12}>

                  <TextField id="title" label="Title" variant="outlined" onChange={handleInput} value={inputTitle} />
                  </Grid>
                  {/* <label className="my-2 font-link" htmlFor="description">
                    Enter Description (Optional)
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                    className="w-100 my-1 p-2 font-link"
                    onChange={handleInputdesc}
                    value={inputDesc}
                  /> */}
                  <Grid item xs={12}>

                  <TextField id="description" fullWidth label="Description (Optional)" onChange={handleInputdesc} value={inputDesc} />
                  </Grid>
                  {/* <div className="text-center"> */}
                  {/* <Grid item xs={12}>

                  <label className="my-2" >
                    Deadline (Optional)
                  </label>
                  </Grid> */}
                  <Grid item xs={12}>
                  {/* <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    placeholder="DD/MM/YYYY"
                    className="w-100 my-1 p-2"
                    onChange={handleInputDeadline}
                    value={inputDeadline}
                  /> */}
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Deadline (Optional)"
                      id="deadline"
                      value={inputDeadline}
                      onChange={(newDeadline) => {
                        handleInputDeadline(newDeadline)
                      }}
                    />
                  </LocalizationProvider>
                  </Grid>
                  <Grid>
                  {toggleSubmit ? (
                    <button className="btn btn-primary my-2 font-link">Save</button>
                  ) : (
                    <button className="btn btn-primary my-2 font-link">Update</button>
                  )}
                  {/* </div> */}
                  </Grid>
                  </Grid>
                </form>
                </Grid>
              {/* </div> */}
              </Grid>
            </Paper>
     ) : (
       ""
     )}
 
     {showList ? (
       <Container>
         {deleteMessage ? (
           <p className="text-center text-danger font-link">Item Deleted Successfully !</p>
         ) : (
           ""
         )}
         {items.map((elem, index) => {
          const deadlineObj = new Date(elem.deadline);

           return (
             <div
             key = {elem._id}
             >
              <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"  
        >
          <Typography sx={{ width: '95%', flexShrink: 0 }}>
          <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          >
            <span style={{fontWeight: 'bold'}} className="font-link" > {elem.task} </span>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
            <Checkbox color="success" checked={elem.completed? true : false} onClick={
              () => editTask(uid, elem._id, elem.name, elem.desc, !elem.completed, elem.date, elem.deadline, tokenPromise)
              }

            />
            <IconButton aria-label="create"
                     onClick={() => handleEdit(elem._id)}
                   >
                    <CreateIcon />
                   </IconButton>

                   {showDelete ? (
                     <IconButton aria-label="delete"
                       onClick={() => handleDelete(elem._id)}
                     >
                     <DeleteIcon />
                     </IconButton>
                   ) : (
                     ""
                   )}
                   </Stack>
            </Stack>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography textAlign="left" >
          <span className="font-link">
          {elem.desc != "" && <p> {elem.desc} </p>}
          {elem.deadline!=null && <p> Deadline: {deadlineObj.toDateString()} {deadlineObj.toLocaleTimeString()}</p>}
          </span>
          </Typography>
        </AccordionDetails>
      </Accordion>
               </div>
            
           );
         })}
       </Container>
     ) : (
       <Container>
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"  
          >
            <Typography sx={{ width: '95%', flexShrink: 0 }}>
              Congratulations you have no current tasks
            </Typography>

        </AccordionSummary>
        <AccordionDetails>

        <Typography textAlign="left" >
          <span className="font-link">
            Add one now!
            </span>
          </Typography>
        </AccordionDetails>
        </Accordion>
       </Container>
     )}
   </>
 );
};
 
export default Todo;