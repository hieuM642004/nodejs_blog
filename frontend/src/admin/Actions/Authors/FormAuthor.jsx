import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../../config/axiosConfig';
import { useParams } from 'react-router-dom';

function FormAuthor() {
	const { id } = useParams();
	const isEditForm = Boolean(id);
	const [author, setAuthor] = useState([]);

	const fetchData = async () => {
		try {
			if (isEditForm) {
				const authorResponse = await axios.get(`/author/${id}`);
				const authorData = authorResponse.data;
				setAuthor(authorData);
				formik.setValues({
					name: authorData.name,
					image: authorData.image,
					year: authorData.year,
					description: authorData.description,
				});
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [id, isEditForm]);

	const formik = useFormik({
		initialValues: {
			name: author ? author.name : '',
		image: author ? author.image : '',
		year: author ? author.year : '',
		description: author ? author.description : '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Tên không được trống'),
			image: Yup.string(),
			year: Yup.number()
				.typeError('Phải là một số')
				.positive('Năm sinh phải là một số dương'),
			description: Yup.string(),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const requestData = {
					name: values.name,
					image: values.image,
					year: values.year,
		
					description: values.description,
				};

				let response;
				if (isEditForm) {
					response = await axios.put(`/author/${id}`, requestData);
				} else {
					response = await axios.post('/author', requestData);
				}

				if (response.status === 200) {
					const message = isEditForm
						? 'Tác giả đã được cập nhật thành công'
						: 'Tác giả đã được thêm thành công';
					toast.success(message);
				} else {
					toast.error('Thêm không thành công.');
				}
			} catch (error) {
				console.error('Đã xảy ra lỗi:', error.message);
			}
			setSubmitting(false);
		},
	});

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="max-w-2xl px-4 py-4 mx-auto lg:py-4">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					{isEditForm ? 'Cập nhật tác giả' : 'Thêm tác giả'}
				</h2>
				<ToastContainer />
				<form
					onSubmit={formik.handleSubmit}
					method="post"
					encType="multipart/form-data"
				>
					<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
						<div className="sm:col-span-2">
							<label
								htmlFor="name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Tên tác giả
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.name}
								onChange={formik.handleChange}
								placeholder="Nhập tên tác giả"
								required=""
							/>
							{formik.errors.name && (
								<p className="text-red-600 text-sm">
									{formik.errors.name}
								</p>
							)}
						</div>
						<div className="sm:col-span-2">
							<label
								htmlFor="image"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Ảnh
							</label>
							<input
								type="text"
								name="image"
								id="image"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.image}
								onChange={formik.handleChange}
								placeholder="URL ảnh"
							/>
							{formik.errors.image && (
								<p className="text-red-600 text-sm">
									{formik.errors.image}
								</p>
							)}
						</div>
						<div className="sm:col-span-2">
							<label
								htmlFor="year"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Năm sinh
							</label>
							<input
								type="text"
								name="year"
								id="year"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.year}
								onChange={formik.handleChange}
								placeholder="Nhập năm sinh"
							/>
							{formik.errors.year && (
								<p className="text-red-600 text-sm">
									{formik.errors.year}
								</p>
							)}
						</div>
					
						<div className="sm:col-span-2">
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Mô tả
							</label>
							<textarea
								name="description"
								id="description"
								rows="5"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								value={formik.values.description}
								onChange={formik.handleChange}
								placeholder="Nhập mô tả"
							/>
							{formik.errors.description && (
								<p className="text-red-600 text-sm">
									{formik.errors.description}
								</p>
							)}
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<button
							type="submit"
							className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							{isEditForm ? 'Cập nhật' : 'Thêm'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

export default FormAuthor;
