import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Share2, Download, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContexts';

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
  createdAt: string;
  updatedAt: string;
}

interface Form {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  formFields: FormField[];
}

interface FormsListProps {
  username: string;
}

const FormsList: React.FC<FormsListProps> = ({ username }) => {
  const [forms, setForms] = useState<Form[]>([]);
  const [responseCounts, setResponseCounts] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchForms = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_SERVER}form/${username}`);
        const fetchedForms = response.data;
        setForms(fetchedForms);

        const countPromises = fetchedForms.map(async (form: Form) => {
          try {
            const responseCountResponse = await axios.get(`${import.meta.env.VITE_SERVER}response/${form.id}`);
            return { formId: form.id, count: responseCountResponse.data.length };
          } catch (err) {
            console.error(`Failed to fetch responses for form ${form.id}`, err);
            return { formId: form.id, count: 0 };
          }
        });

        const responseCounts = await Promise.all(countPromises);
        const countsMap = responseCounts.reduce((acc, item) => {
          acc[item.formId] = item.count;
          return acc;
        }, {});

        setResponseCounts(countsMap);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch forms');
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchForms();
  }, [username]);

  const handleDeleteForm = async (formId: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}form/${username}/${formId}`);

      setForms(forms.filter(form => form.id !== formId));

      const newResponseCounts = { ...responseCounts };
      delete newResponseCounts[formId];
      setResponseCounts(newResponseCounts);
    } catch (err) {
      setError('Failed to delete form');
      console.error(err);
    }
  };

  const handleEditForm = (formId: number) => {
    navigate(`/dashboard/forms/edit/${formId}`);
  };

  const handleShareForm = (formId: number) => {
    const shareUrl = `${window.location.origin}/response/${username}/${formId}`;


    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Form share link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const downloadCSV = async (formId: number) => {
    try {

      const response = await axios.get(`${import.meta.env.VITE_SERVER}response/${formId}/export-csv`, {
        responseType: 'blob'
      });


      const blob = new Blob([response.data], { type: 'text/csv' });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      // Set the filename to be the form title + timestamp
      const form = forms.find(f => f.id === formId);
      const filename = `${form?.title || 'form'}_responses_${new Date().toISOString().replace(/:/g, '-')}.csv`;
      link.download = filename;


      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download CSV', err);
      alert('Failed to download CSV. Please try again.');
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl">Loading forms...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500">
      Error: {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {forms.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No forms found. Create your first form!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map(form => (
            <div
              key={form.id}
              className="border rounded-lg p-4 shadow-md flex flex-col justify-between space-y-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 truncate">{form.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{form.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Created: {new Date(form.createdAt).toLocaleDateString()}</p>
                  <p>Responses: {responseCounts[form.id] || 0}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleShareForm(form.id)}
                  className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center"
                  title="Share Form"
                >
                  <Share2 className="mr-2" size={16} /> Share
                </button>
                <button
                  onClick={() => downloadCSV(form.id)}
                  className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
                  title="Download Responses"
                >
                  <Download className="mr-2" size={16} /> Download CSV
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditForm(form.id)}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
                >
                  <Edit2 className="mr-2" size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteForm(form.id)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <Trash2 className="mr-2" size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsList;

export const FormsPage: React.FC = () => {
  const { authUser } = useAuth();
  const username = authUser;

  return (
    <div>
      <FormsList username={username} />
    </div>
  );
};