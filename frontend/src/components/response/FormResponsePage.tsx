import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


interface FormField {
    id: number;
    formId: number;
    fieldType: string;
    label: string;
    placeholder: string;
    isRequired: boolean;
    defaultValue: string;
    options: string[] | null;
    order: number;
}

interface Form {
    id: number;
    title: string;
    description: string;
    formFields: FormField[];
}

const FormResponsePage: React.FC = () => {
    const { username, formId } = useParams<{ username: string; formId: string }>();
    const [form, setForm] = useState<Form | null>(null);
    const [formResponses, setFormResponses] = useState<{ [key: string]: any }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchFormData = async () => {
            try {

                const response = await axios.get(`${import.meta.env.VITE_SERVER}form/${username}`);


                const selectedForm = response.data.find((f: Form) => f.id === parseInt(formId || '0'));

                if (selectedForm) {
                    setForm(selectedForm);


                    const initialResponses = selectedForm.formFields.reduce((acc, field) => {
                        acc[field.id] = field.defaultValue || '';
                        return acc;
                    }, {} as { [key: string]: any });

                    setFormResponses(initialResponses);
                } else {
                    setError('Form not found');
                }
            } catch (err) {
                setError('Failed to fetch form data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFormData();
    }, [username, formId]);


    const handleInputChange = (fieldId: number, value: any) => {
        setFormResponses(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);


        const requiredFields = form?.formFields.filter(f => f.isRequired) || [];
        const missingFields = requiredFields.filter(
            field => !formResponses[field.id] ||
                formResponses[field.id] === '' ||
                formResponses[field.id] === 'false'
        );

        if (missingFields.length > 0) {
            setSubmitError(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
            setIsSubmitting(false);
            return;
        }

        try {

            await axios.post(`${import.meta.env.VITE_SERVER}response/create`, {
                formId: parseInt(formId || '0'),
                username,
                responses: formResponses
            });


            alert('Form submitted successfully!');

        } catch (err) {
            setSubmitError('Failed to submit form');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };


    const renderFormField = (field: FormField) => {
        const value = formResponses[field.id];

        switch (field.fieldType) {
            case 'text':
                return (
                    <input
                        type="text"
                        id={`field-${field.id}`}
                        value={value}
                        placeholder={field.placeholder}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.isRequired}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        id={`field-${field.id}`}
                        value={value}
                        placeholder={field.placeholder}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.isRequired}
                    />
                );

            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        {field.options?.map((option) => (
                            <div key={option} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`field-${field.id}-${option}`}
                                    checked={value === option}
                                    onChange={() => handleInputChange(field.id, option)}
                                    className="mr-2 focus:ring-blue-500"
                                    required={field.isRequired}
                                />
                                <label htmlFor={`field-${field.id}-${option}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                );

            case 'dropdown':
                return (
                    <select
                        id={`field-${field.id}`}
                        value={value}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.isRequired}
                    >
                        {field.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.options?.map((option) => (
                            <div key={option} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`field-${field.id}-${option}`}
                                    name={`field-${field.id}`}
                                    value={option}
                                    checked={value === option}
                                    onChange={() => handleInputChange(field.id, option)}
                                    className="mr-2 focus:ring-blue-500"
                                    required={field.isRequired}
                                />
                                <label htmlFor={`field-${field.id}-${option}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading form...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-semibold text-gray-900">{form?.title}</h1>
                            <p className="mt-2 text-gray-600">{form?.description}</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {form?.formFields
                                .sort((a, b) => a.order - b.order)
                                .map((field) => (
                                    <div key={field.id}>
                                        <label
                                            htmlFor={`field-${field.id}`}
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                                        </label>
                                        {renderFormField(field)}
                                    </div>
                                ))}

                            {submitError && (
                                <div className="text-red-500 text-sm mb-4">
                                    {submitError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium 
                  ${isSubmitting
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Form'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormResponsePage;