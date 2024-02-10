import React, { useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
} from "react-icons/md";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Table = ({ passwords, setPasswords, isLoading }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editText, setEditText] = useState({
        'select_date': '',
        'website_name': '',
        'website_url': '',
        'username': '',
        'email_address': '',
        'user_password': '',
        'id': null,
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/app/${id}/`);
            // Update state after successful deletion
            setPasswords((prevPasswords) => prevPasswords.filter((password) => password.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async () => {
        try {
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/app/${editText.id}/`,
                editText
            );
            const newPasswordsList = passwords.map((password) =>
                password.id === editText.id ? response.data : password
            );
            setPasswords(newPasswordsList);
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditText((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClick = () => {
        handleEdit();
        setEditText({
            'select_date': '',
            'website_name': '',
            'website_url': '',
            'username': '',
            'email_address': '',
            'user_password': '',
            'id': null,
        });
    };

    return (
        <div className="container-fluid">
            <table className="container-fluid table-bordered table table-dark">
                <thead className="border-b-2 border-black">
                    <tr>
                        <th className="p-3 text-xl font-semibold text-center">Website</th>
                        <th className="p-3 text-xl font-semibold text-center">Url</th>
                        <th className="p-3 text-xl font-semibold text-center">Username</th>
                        <th className="p-3 text-xl font-semibold text-center">Email</th>
                        <th className="p-3 text-xl font-semibold text-center">Password</th>
                        <th className="p-3 text-xl font-semibold text-center">Created</th>
                        <th className="p-3 text-xl font-semibold text-center">Modified</th>
                        <th className="p-3 text-xl font-semibold text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="8">Is Loading...</td>
                        </tr>
                    ) : (
                        <>
                            {passwords.map((passwordItem) => (
                                <tr key={passwordItem.id}>
                                    <td className="p-2 text-center">{passwordItem.website_name}</td>
                                    <td className="p-2 text-center">{passwordItem.website_url}</td>
                                    <td className="p-2 text-center">{passwordItem.username}</td>
                                    <td className="p-2 text-center">{passwordItem.email_address}</td>
                                    <td className="p-2 text-center">{passwordItem.user_password}</td>
                                    <td className="p-2 text-center">
                                        {new Date(passwordItem.created).toLocaleString("en-US", {
                                            year: "numeric", month: "short",
                                            day: "numeric", hour: "numeric",
                                            minute: "numeric", second: "numeric",
                                        })}
                                    </td>
                                    <td className="text-lg p-2 text-center">
                                        {new Date(passwordItem.updated).toLocaleString("en-US", {
                                            year: "numeric", month: "short",
                                            day: "numeric", hour: "numeric",
                                            minute: "numeric", second: "numeric",
                                        })}
                                    </td>
                                    <td className="text-lg p-2 text-center" style={{minWidth: '200px'}}>
                                        <div className="row">
                                            <div className="col-6">
                                                <span className="inline-block cursor-pointer" title="Edit">
                                                    {" "}
                                                    <Button variant="primary" onClick={handleShow}><MdEditNote onClick={() => setEditText(passwordItem)} /></Button>
                                                </span>
                                            </div>
                                            <div className="col-6">
                                                <span
                                                    className="inline-block cursor-pointer"
                                                    onClick={() => handleDelete(passwordItem.id)}
                                                    title="Delete" >
                                                    <MdOutlineDeleteOutline />
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton className="p-5 bg-dark text-white">
                    <div className="row">
                        <Form.Control type="date" className="col-12 mt-3" name="select_date" value={editText.select_date} onChange={handleChange} required />
                        <Form.Control type="text" className="col-12 mt-3" name="website_name" value={editText.website_name} onChange={handleChange} />
                        <Form.Control type="text" className="col-12 mt-3" name="website_url" value={editText.website_url} onChange={handleChange} />
                        <Form.Control type="text" className="col-12 mt-3" name="username" value={editText.username} onChange={handleChange} />
                        <div className="col-12 mt-3">
                            <select
                                className='form-select p-2'
                                value={editText.email_address}
                                onChange={handleChange}
                                name="email_address"
                            >
                                <option value=''>Select Email</option>
                                <option value='a@a.com'>a@a.com</option>
                                <option value='b@b.com'>b@b.com</option>
                                <option value='c@c.com'>c@c.com</option>
                                <option value='d@d.com'>d@d.com</option>
                                <option value='e@e.com'>e@e.com</option>
                                <option value='f@f.com'>f@f.com</option>
                                <option value='g@g.com'>g@g.com</option>
                                <option value='h@h.com'>h@h.com</option>
                                <option value='i@i.com'>i@i.com</option>
                                <option value='j@j.com'>j@j.com</option>
                            </select>
                        </div>
                        <Form.Control type="text" className="col-12 mt-3" name="user_password" value={editText.user_password} onChange={handleChange} />
                    </div>
                </Modal.Header>
                <Modal.Footer className="col-12 d-flex align-items-center justify-content-center mt-3">
                    <div className="row">
                        <Button variant="primary" onClick={handleClick} className="mt-1 col-4 mx-1" style={{width: '200px'}}>
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleClose} className="mt-1 col-4 mx-1" style={{width: '200px'}}>
                            Close
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Table;