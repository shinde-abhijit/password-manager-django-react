import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PasswordForm = ({ setPasswords, fetchData }) => {
    const [newPasswords, setNewPasswords] = useState({
        'select_date': '',
        'website_name': '',
        'website_url': '',
        'username': '',
        'email_address': '',
        'user_password': '',
    });

    const handleDate = (e) => {
        setNewPasswords(prev => ({
            ...prev,
            'select_date': e.target.value,
        }));
    };

    const handleWebsiteChange = (e) => {
        setNewPasswords(prev => ({
            ...prev,
            'website_name': e.target.value,
        }));
    };

    const handleWebsiteUrlChange = (e) => {
        setNewPasswords(prev => ({
            ...prev,
            'website_url': e.target.value,
        }));
    };

    const handleUsernameChange = (e) => {
        setNewPasswords(prev => ({
            ...prev,
            'username': e.target.value,
        }));
    };

    const handleUserPasswordChange = (e) => {
        setNewPasswords(prev => ({
            ...prev,
            'user_password': e.target.value,
        }));
    };

    const handleEmailChange = (e) => {
        setNewPasswords(prev => ({
            ...prev,
            email_address: e.target.value,
        }));
    };

    const postPassword = async () => {
        try {
            console.log('Request Payload:', {
                select_date: newPasswords.select_date,
                website_name: newPasswords.website_name,
                website_url: newPasswords.website_url,
                username: newPasswords.username,
                email_address: newPasswords.email_address,
                user_password: newPasswords.user_password,
            });

            await axios.post('http://127.0.0.1:8000/api/app/', {
                select_date: newPasswords.select_date,
                website_name: newPasswords.website_name,
                website_url: newPasswords.website_url,
                username: newPasswords.username,
                email_address: newPasswords.email_address,
                user_password: newPasswords.user_password,
            });

            // Reset the form after successful submission
            setNewPasswords({
                'select_date': '',
                'website_name': '',
                'website_url': '',
                'username': '',
                'email_address': '',
                'user_password': '',
            });
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-fluid d-flex align-items-center justify-content-center'>
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-6 mb-1 mt-1">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                postPassword()
                            }
                        }}
                        onChange={handleDate} value={newPasswords.select_date} type="date" className="form-control" />
                </div>
                <div className="col-xl-3 col-lg-4 col-6 mb-1 mt-1">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                postPassword()
                            }
                        }}
                        onChange={handleWebsiteChange} value={newPasswords.website_name} type="text" placeholder='Enter Website Name' className="form-control" />
                </div>
                <div className="col-xl-3 col-lg-4 col-6 mb-1 mt-1">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                postPassword()
                            }
                        }}
                        onChange={handleWebsiteUrlChange} value={newPasswords.website_url} type="text" placeholder='Enter Website Url' className="form-control" />
                </div>
                <div className="col-xl-3 col-lg-4 col-6 mb-1 mt-1">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                postPassword()
                            }
                        }}
                        onChange={handleUsernameChange} value={newPasswords.username} type="text" placeholder='Enter Username' className="form-control" />
                </div>
                <div className="col-xl-6 col-lg-4 col-6 mb-1 mt-1">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                postPassword()
                            }
                        }}
                        onChange={handleUserPasswordChange} value={newPasswords.user_password} type="text" placeholder='Enter Password' className="form-control" />
                </div>
                <div className='col-xl-6 col-lg-4 col-6 mb-1 mt-1'>
                    <select
                        className='form-select'
                        value={newPasswords.email_address}
                        onChange={handleEmailChange}
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
                <div className="container-fluid d-flex align-items-center justify-content-center mt-3 mb-3">
                    <button onClick={postPassword} className="btn btn-active btn-primary w-25">Add Record</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordForm;