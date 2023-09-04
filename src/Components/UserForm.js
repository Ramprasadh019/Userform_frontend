import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";





function UserForm() {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () =>setShowModal(false);

    const [viewEdit, setEditShow] = useState(false);
const [editData, setEditData] = useState(null)

  const handleEditOpen = (item) => {
 
    setEditData(item)
    setEditShow(true)
   };
  const handleEditClose = () => setEditShow(false);




  
  
    const [userData, setUserData] = useState([]);
    const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [mobile, setMobile] = useState('');
      const [address1, setAddress1] = useState('');
      const [address2, setAddress2] = useState('');

   const [id, setId] = useState('')



      const UserData = () => {
        axios
          .get("http://localhost:8000/usersData")
    
          .then((data) => {
            // console.log(55, data)
            setUserData(data.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      // Function to handle form submission
      const handleSubmit = async(e) => {
          e.preventDefault();
  
          axios
          .post("http://localhost:8000/usersData", {
              firstName ,
              lastName ,
              email ,
              mobile ,
              address1 ,
              address2 
       
          })
          .then((response) => {
            console.log(response);
            setUserData((prevData) => [response.data.data,...prevData]);
            handleCloseModal()
            setShowModal(false);
            setFirstName("");
            setLastName("");
            setEmail("");
            setMobile("");
            console.log('Modal should be closed'); 
          })
          .catch((err) => {
            console.log(err);
          });
      }


      const handleEdit = (e) => {
        console.log(e);
        e.preventDefault();
        // const Store = [setName(""), setWidth, setHeight, setRate, setId];
    
        axios
          .put(`http://localhost:8000/userEdit/${editData?._id}`, {
            firstName ,
            lastName ,
            email ,
            mobile ,
            address1 ,
            address2 
          })
    
          .then((response) => {
           const index = userData.findIndex((user) => user._id === id)

           const newUser = userData

           newUser.splice(index, 1, response.data.data)

           setUserData(newUser)
           setEditShow(false)
           
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      const handleDelete = async (id) => {

        try{
            await axios.delete(`http://localhost:8000/users/${id}`);
            setUserData((userData) => userData.filter((item) => item._id !== id));

        }catch (error){
            console.log(error)
        }

      }        
    
    useEffect(() => {
        UserData();
      }, []);

      return (
        <div className="pcoded-content">
          <h5>User Form</h5>
          <div className="pcoded-inner-content">
            {/* Main-body start */}
            <div className="main-body">
              <div className="page-wrapper">
                {/* Page-body start */}
                <div className="page-body">
                  {/* Basic table card start */}
                  <div className="card">
                    <div className="card-header">
                      <Button
                        onClick={handleShowModal}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Add User
                      </Button>
                    </div>
                    <div className="card-block table-border-style">
                      <div className="table-responsive">
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Sl No</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Mobile no</TableCell>
                                <TableCell align="center">E-mail</TableCell>
                                <TableCell align="center">Address 1</TableCell>
                                <TableCell align="center">Address 2</TableCell>
                                <TableCell align="center">button</TableCell>

                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {userData.map((item, index) => (
                                <TableRow key={item._id}>
                                  <TableCell align="center">{index + 1}</TableCell>
                                  <TableCell align="center">{item.firstName}</TableCell>
                                  <TableCell align="center">{item.lastName}</TableCell>
                                  <TableCell align="center">{item.mobile}</TableCell>
                                  <TableCell align="center">{item.email}</TableCell>
                                  <TableCell align="center">{item.address1}</TableCell>
                                  <TableCell align="center">{item.address2}</TableCell>
                                  <TableCell align="center">
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                      
                                        handleEditOpen(item);
                                        setId(item._id)
                                      }}
                                      style={{ margin: "0 5px" }}
                                    >
                                      <EditIcon
                                        style={{ color: "#3b6ba5" }}
                                        fontSize="small"
                                      />
                                    </IconButton>
    
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {handleDelete(item._id)} }
                                    >
                                      <DeleteIcon
                                        style={{ color: "#f03939" }}
                                        fontSize="small"
                                      />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                     
                       
                      </div>
    
                      {/* Add */}
                      <div className="model-box-view">
                        <Modal
                          show={showModal}
                          onHide={handleSubmit}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header>
                            <Modal.Title>User</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div>
                              <div className="form-group mt-3">
                                <label>FirstName</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  placeholder="Enter First Name"
                                  required
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>LastName</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setLastName(e.target.value)}
                                  placeholder="Enter Last Name"
                                  required
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Email</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Enter Mail-id"
                                  required
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Mobile</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setMobile(e.target.value)}
                                  placeholder="Enter mobile number"
                                  required
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Address1</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setAddress1(e.target.value)}
                                  placeholder="Enter Address"
                                  required
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Address2</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setAddress2(e.target.value)}
                                  placeholder="Enter Address "
                                  
                                />
                              </div>
                          
                           
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
                        </Modal>
                      </div>
                      {/* Add End */}
    
                      {/* Edit & Delete */}
                      <div className="model-box-view">
                        <Modal
                          show={viewEdit}
                          onHide={
                            handleEditClose
                          }
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header>
                            <Modal.Title>
                              Edit
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div>
                              <div className="form-group mt-3">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setFirstName(e.target.value)}
                                  placeholder="Enter First Name"
                                  defaultValue={editData?.firstName}
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>LastName</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setLastName(e.target.value)}
                                  placeholder="Enter Last Name"
                                  defaultValue={editData?.lastName}
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Mail-id</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Enter Mail-id"
                                  defaultValue={editData?.email}
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Mobile</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setMobile(e.target.value)}
                                  placeholder="Please enter Rate"
                                  defaultValue={editData?.mobile}
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Address 1</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setAddress1(e.target.value)}
                                  placeholder="Enter Address"
                                  defaultValue={editData?.address1}
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Address 2</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setAddress2(e.target.value)}
                                  placeholder="Enter Address"
                                  defaultValue={editData?.address2}
                                />
                              </div>
                             
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
          <Button variant="secondary" onClick={handleEdit}>
          Update
          </Button>
          <Button variant="primary" onClick={handleEditClose}>
          Close
          </Button>
        </Modal.Footer>
                        </Modal>
                      </div>
                      {/* Edit & Delete end */}
                    </div>
                  </div>
                </div>
                {/* Page-body end */}
              </div>
            </div>
            {/* Main-body end */}
            <div id="styleSelector" />
          </div>
        </div>
      );

  

}


export default UserForm;
