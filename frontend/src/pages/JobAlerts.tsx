import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function JobAlerts() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: alerts, isLoading } = useQuery('jobAlerts', () =>
    axios.get('/api/job-alerts').then(res => res.data)
  );

  const createMutation = useMutation(
    (data) => axios.post('/api/job-alerts', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobAlerts');
        reset();
      },
    }
  );

  const onSubmit = (data: any) => {
    createMutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Job Alert</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Job URL
            </label>
            <input
              type="url"
              {...register('url')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://example.com/job-posting"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Alert
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Your Job Alerts</h2>
        <div className="space-y-4">
          {alerts?.map((alert: any) => (
            <div key={alert._id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{alert.url}</p>
                <p className="text-sm text-gray-500">
                  Last checked: {alert.lastChecked ? new Date(alert.lastChecked).toLocaleString() : 'Never'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {alert.status}
                </span>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}