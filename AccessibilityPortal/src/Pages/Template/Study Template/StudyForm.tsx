import React, { useState } from 'react';

type FormData = {
    title: string;
    description: string;
    date: string;
    endDate: string;
    studyType: string;
};

const StudyForm = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        date: '',
        endDate: '',
        studyType: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const validationErrors: Partial<FormData> = {};

        if (!formData.title) {
            validationErrors.title = 'Title is required';
        }

        if (!formData.description) {
            validationErrors.description = 'Description is required';
        }

        if (!formData.date) {
            validationErrors.date = 'Start date is required';
        }

        if (!formData.endDate) {
            validationErrors.endDate = 'End date is required';
        } else if (new Date(formData.endDate) < new Date(formData.date)) {
            validationErrors.endDate = 'End date must be after start date';
        }

        if (!formData.studyType) {
            validationErrors.studyType = 'Study type is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form submitted with data:', formData);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Post a New Study</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={`form-control ${errors.title && 'is-invalid'}`}
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className={`form-control ${errors.description && 'is-invalid'}`}
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="date">Start Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className={`form-control ${errors.date && 'is-invalid'}`}
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className={`form-control ${errors.endDate && 'is-invalid'}`}
                        value={formData.endDate}
                        onChange={handleInputChange}
                    />
                    {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="studyType">Study Type:</label>
                    <select
                        id="studyType"
                        name="studyType"
                        className={`form-control ${errors.studyType && 'is-invalid'}`}
                        value={formData.studyType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a study type</option>
                        <option value="Experimental">Experimental</option>
                        <option value="Observational">Observational</option>
                    </select>
                    {errors.studyType && <div className="invalid-feedback">{errors.studyType}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default StudyForm
