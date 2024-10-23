import { useQuery } from 'react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const { data: alerts, isLoading } = useQuery('jobAlerts', () =>
    axios.get('/api/job-alerts').then(res => res.data)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Job Alert
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Active Job Alerts</h2>
        {alerts?.length === 0 ? (
          <p className="text-gray-500">No job alerts yet. Add your first one!</p>
        ) : (
          <div className="space-y-4">
            {alerts?.map((alert: any) => (
              <div key={alert._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{alert.url}</h3>
                    <p className="text-sm text-gray-500">Last checked: {new Date(alert.lastChecked).toLocaleString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}