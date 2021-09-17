import React from 'react';
import './Contact.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { saveContact, saveCurrentContact } from '../features/contactSlice.js';
import { useHistory } from "react-router-dom";

function Contact({ name, email, address, phoneNumber, itemKey }) {

    const dispatch = useDispatch();
    let history = useHistory();

    const isPresent = (value) => {
        return (value?.itemKey !== itemKey);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        var data = JSON.parse(localStorage.getItem('contacts-data-list'));
        if(data?.length) {
            var newData = data?.filter(isPresent);
            console.log(newData);
            console.log(itemKey);
            dispatch(saveContact(newData))
            localStorage.removeItem('contacts-data-list');
            localStorage.setItem('contacts-data-list', JSON.stringify(newData));
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        handleDelete(e);
        dispatch(saveCurrentContact({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            itemKey: itemKey,
        }))
        history.push("/addcontact");
    }

    return (
        <div className="contact">
            <div className="contact__info">
                <table>
                    <tr>
                        <td className="field">Name</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td className="field">Contact</td>
                        <td>{phoneNumber}</td>
                    </tr>
                    <tr>
                        <td className="field">Email-Id</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td className="field">Address</td>
                        <td>{address}</td>
                    </tr>
                </table>
            </div>

            <div className="contact__edit">
                <IconButton className="icons" onClick={handleEdit} >
                    <EditIcon color="primary"/>
                </IconButton>
                <IconButton className="icons" onClick={handleDelete} >
                    <DeleteIcon color="secondary" />
                </IconButton>
            </div>
        </div>
    )
}

export default Contact
