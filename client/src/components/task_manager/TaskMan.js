import React, { useState } from "react";
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
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { addToDB } from "../../services/taskManagerServices";
 
const Todo = (props) => {
 const { uid } = props;
 const [showForm, setshowform] = useState(true);
 const [showNew, setshowNew] = useState(true);
 const [showDelete, setshowDelete] = useState(true);
 const [toggleSubmit, settoggleSubmit] = useState(true);
 const [isEditItem, setisEditItem] = useState(null);
 const [showList, setshowList] = useState(true);
 const [editMessage, seteditMessage] = useState(false);
 const [deleteMessage, setdeleteMessage] = useState(false);
 const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
 const [isCompleted, setisCompleted] = useState(false);
 const [inputTitle, setinputTitle] = useState("");
 const [inputDesc, setinputDesc] = useState("");
 const [inputDeadline, setInputDeadline] = useState("");
 const [items, setitems] = useState([
   {
     id: "001",
     name: "Task name here",
     desc: "Description here",
     status: false,
     completed: false,
     deadline: "",
     
   },
 ]);

 
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
   setisCompleted(!toUpdate.completed);
   setisEditItem(index);
   console.log(toUpdate);
 }
 const handleInputDeadline = (e) => {
  setInputDeadline(e.target.value);
 }
 //   HANDLING INPUT FIELDS
 
 //   SUBMITTING FORM
 const handleSubmit = (e) => {
   setshowList(true);
   setshowNew(true);
 
   e.preventDefault();
   if (!inputTitle ) {
     alert("fill data");
     showList(false);
   } else if (inputTitle && !toggleSubmit) {
     setitems(
       items.map((elem) => {
         if (elem.id === isEditItem) {
           return { ...elem, name: inputTitle, desc: inputDesc };
         }
         return elem;
       })
     );
 
     setinputTitle("");
     setinputDesc("");
     setInputDeadline("");
     settoggleSubmit(true);
     setshowform(false);
     setshowDelete(true);
     setisCompleted(false);
   } else {
     const allinputTitle = {
       id: new Date().getTime().toString(),
       name: inputTitle,
       desc: inputDesc,
       completed: isCompleted,
     };
     addToDB(inputTitle, inputDesc, uid);
     setitems([allinputTitle, ...items]);
     setinputTitle("");
     setinputDesc("");
     setshowform(false);
   }
 };
 //   SUBMITTING FORM
 
 //   DELETE
 const handleDelete = (index) => {
   console.log(index);
   const updatedItems = items.filter((elem) => {
     return index !== elem.id;
   });
   setdeleteMessage(true);
   setitems(updatedItems);
 
   setTimeout(() => {
     setdeleteMessage(false);
   }, 1000);

   setdeleteMessagesuccess(false);
 };
 //   DELETE
 
 //   EDIT
 const handleEdit = (id) => {
   setshowList(false);
   setshowDelete(false);
   setshowNew(false);
   setshowform(true);
   setisCompleted(false);
 
   settoggleSubmit(false);
   let newEditItem = items.find((elem) => {
     return elem.id === id;
   });
   setinputTitle(newEditItem.name);
   setinputDesc(newEditItem.desc);
   setInputDeadline(newEditItem.inputDeadline)
   // setshowDelete(true)
 
   setisEditItem(id);
   console.log(newEditItem);
 };
 //   EDIT
 
 // ADD NEW TASK
 const handleAdd = () => {
   setshowform(true);
   setshowList(true);
   setshowNew(false);
   setisCompleted(false);
 };
 // ADD NEW TASK
 return (
   <>
     {showNew ? (
       <Container>
         <div className="col-12 text-end">
           <Button variant="contained" onClick={handleAdd}>
             Add New Task
           </Button>
         </div>
       </Container>
     ) : (
       ""
     )}
 
     {showForm ? (
       <>
         <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
           <div className="row">
             <div className="text-center">
               <h2>{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
             </div>
             <form className="col-12 p-2" onSubmit={handleSubmit}>
               <label htmlFor="Title" className="my-2">
                 Enter Title
               </label>
               <input
                 type="text"
                 name="title"
                 id="title"
                 placeholder="title"
                 className="w-100 my-1 p-2"
                 onChange={handleInput}
                 value={inputTitle}
               />
               <label className="my-2" htmlFor="description">
                 Enter Description (Optional)
               </label>
               <input
                 type="text"
                 name="description"
                 id="description"
                 placeholder="Description"
                 className="w-100 my-1 p-2"
                 onChange={handleInputdesc}
                 value={inputDesc}
               />
               {/* <div className="text-center"> */}
               <label className="my-2" >
                 Deadline (Optional)
               </label>
               <input
                 type="date"
                 name="deadline"
                 id="deadline"
                 placeholder="DD/MM/YYYY"
                 className="w-100 my-1 p-2"
                 onChange={handleInputDeadline}
                 value={inputDeadline}
               />
               {toggleSubmit ? (
                 <button className="btn btn-primary my-2">Save</button>
               ) : (
                 <button className="btn btn-primary my-2">Update</button>
               )}
               {/* </div> */}
             </form>
           </div>
         </div>
       </>
     ) : (
       ""
     )}
 
     {showList ? (
       <Container>
         {deleteMessage ? (
           <p className="text-center text-danger">Item Deleted Successfully !</p>
         ) : (
           ""
         )}
         {items.map((elem, index) => {
           return (
             <div
             key = {elem.id}
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
            <span style={{textDecoration: elem.completed  ? 'line-through' : ''}}> {elem.name} </span>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
            <Checkbox onClick = {() => handleComplete(elem.id)} color="success" />
            <IconButton aria-label="create"
                     onClick={() => handleEdit(elem.id)}
                   >
                    <CreateIcon />
                   </IconButton>

                   {showDelete ? (
                     <IconButton aria-label="delete"
                       onClick={() => handleDelete(elem.id)}
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
          <Typography textAlign="left">
          {elem.desc}
          </Typography>
        </AccordionDetails>
      </Accordion>
               </div>
            
           );
         })}
       </Container>
     ) : (
       ""
     )}
   </>
 );
};
 
export default Todo;