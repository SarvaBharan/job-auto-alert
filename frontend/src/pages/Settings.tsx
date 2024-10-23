import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailNotifications: user?.emailNotifications,
    },
  });

  const updateSettings = useMutation(
    (data) => axios.patch('/api/users/settings', data),
    {
      onSuccess: () => {
        // Handle success
      },
    }
  );

  const onSubmit = (data: any) => {
    updateSettings.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('emailNotifications')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                Receive email notifications
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Get notified when job positions become available
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}