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
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { addToDB, getTaskEntries, deleteFromDB, editTask } from "../../services/taskManagerServices";
 
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
//  const [isCompleted, setisCompleted] = useState(false);
 const [inputTitle, setinputTitle] = useState("");
 const [inputDesc, setinputDesc] = useState("");
//  const [items, setitems] = useState([
//    {
//      id: "001",
//      name: "Task name here",
//      desc: "Description here",
//      status: false,
//      completed: false,
//    },
//  ]);

const [ items, setitems ] = useState();

useEffect(() => {
  const fetchEntries = async (uid) => {
    const fetchedEntries = await getTaskEntries(uid);
    setitems(fetchedEntries);
    console.log(fetchedEntries[0]._id);
  }
  fetchEntries(uid);
}, [])

if (items === undefined) {
  return null;
}
 
 //   HANDLING INPUT FIELDS
 const handleInput = (e) => {
   setinputTitle(e.target.value);
 };
 const handleInputdesc = (e) => {
   setinputDesc(e.target.value);
 };
//  const handleComplete = (index) => {
//    const toUpdate = items.find((elem) => {
//     return index === elem.id
//    });
//    setisCompleted(!toUpdate.completed);
//    setisEditItem(index);
//    console.log(toUpdate);
//  }
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
         if (elem._id === isEditItem) {
           editTask(elem._id, inputTitle, inputDesc);
           return { ...elem, task: inputTitle, desc: inputDesc };
         }
         return elem;
       })
     );
 
     setinputTitle("");
     setinputDesc("");
     settoggleSubmit(true);
     setshowform(false);
     setshowDelete(true);
    //  setisCompleted(false);
   } else {
     const allinputTitle = {
       _id: new Date().getTime().toString(),
       task: inputTitle,
       desc: inputDesc,
      //  completed: isCompleted,
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
     return index !== elem._id;
   });
   deleteFromDB(index);
   setdeleteMessage(true);
   setitems(updatedItems);
 
   setTimeout(() => {
     setdeleteMessage(false);
   }, 1000);

   setdeleteMessagesuccess(false);
 };
 //   DELETE
 
 //   EDIT
 const handleEdit = (_id) => {
   setshowList(false);
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
   // setshowDelete(true)
 
   setisEditItem(_id);

   console.log(newEditItem.task);
   console.log(newEditItem);
 };
 //   EDIT
 
 // ADD NEW TASK
 const handleAdd = () => {
   //   alert("hello")
   setshowform(true);
   setshowList(true);
   setshowNew(false);
  //  setisCompleted(false);
 };
 // ADD NEW TASK
 return (
   <>
     {showNew ? (
       <Container>
         <div className="col-12 text-end">
         <Box m={2}> 
           <Button variant="contained" onClick={handleAdd} >
           <span  className="font-link">
           Add New Task
           </span>
           </Button>
           </Box>
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
               <h2 className="font-link">{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
             </div>
             <form className="col-12 p-2" onSubmit={handleSubmit}>
               <label htmlFor="Title" className="my-2 font-link" >
                 Enter Title
               </label>
               <input
                 type="text"
                 name="title"
                 id="title"
                 placeholder="Title"
                 className="w-100 my-1 p-2 font-link"
                 onChange={handleInput}
                 value={inputTitle}
               />
               <label className="my-2 font-link" htmlFor="description">
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
               />
               {/* <div className="text-center"> */}
               {toggleSubmit ? (
                 <button className="btn btn-primary my-2 font-link">Save</button>
               ) : (
                 <button className="btn btn-primary my-2 font-link">Update</button>
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
           <p className="text-center text-danger font-link">Item Deleted Successfully !</p>
         ) : (
           ""
         )}
         {items.map((elem, index) => {
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
            <Checkbox color="success" />
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
          {elem.desc}
          </span>
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