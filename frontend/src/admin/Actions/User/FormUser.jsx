import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../../config/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

function FormUser() {
    const { id } = useParams();
    const isEditForm = Boolean(id);
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch necessary data based on id or isEditForm
                if (isEditForm) {
                    // Fetch data for editing user with id
                    const response = await axios.get(`/user/${id}`);
                    const userData = response.data;
    
                    // Set form values using formik.setValues()
                    formik.setValues({
                        username: userData.username,
                        email: userData.email,
                        // Populate other fields as needed
                    });
    
                    // You may also fetch additional data here if needed
                } 
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, [id, isEditForm]);
    

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            avatar: null,
            isAdmin: false,
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const formData = new FormData();
                formData.append('username', values.username);
                formData.append('password', values.password);
                formData.append('email', values.email);
                formData.append('avatar', values.avatar);
                formData.append('isAdmin', values.isAdmin);

                let response;
                if (isEditForm) {
                    response = await axios.put(`/user/${id}`, formData);
                } else {
                    response = await axios.post('/user', formData);
                }

                if (response.status === 200 ) {
                    const message = isEditForm ? 'User updated successfully' : 'User added successfully';
                    toast.success(message);
                    navigate('/admin/user');
                } else {
                    toast.error('Failed to add/update user.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                toast.error('An error occurred. Please try again.');
            }
            setSubmitting(false);
        },
    });

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        formik.setFieldValue('avatar', e.target.files[0]);
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-4 mx-auto lg:py-4">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {isEditForm ? 'Edit User' : 'Add User'}
                </h2>
                <ToastContainer />
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="sm:col-span-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                placeholder="Enter username"
                            />
                            {formik.errors.username && <p className="text-red-600 text-sm">{formik.errors.username}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Enter password"
                            />
                            {formik.errors.password && <p className="text-red-600 text-sm">{formik.errors.password}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter email"
                            />
                            {formik.errors.email && <p className="text-red-600 text-sm">{formik.errors.email}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin</label>
                            <label className="inline-flex items-center cursor-pointer flex-col ">
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">Is Admin</span>
                                <input
                                    checked={formik.values.isAdmin}
                                    onChange={(e) => formik.setFieldValue('isAdmin', e.target.checked)}
                                    type="checkbox"
                                    className="sr-only peer "
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            {isEditForm ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default FormUser;
