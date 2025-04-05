const Dashboard = async () => {

  return (
    <div className='h-5 w-full px-2'>
      <div className=" justify-start grid grid-cols-1 md:grid-cols-2 p-4">

      {/* card-1  */}
      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">New Contracts</div>
          <p className="text-gray-700 text-base">
            Create new contracts for your clients. You can customize the contract terms and conditions to suit your needs.
          </p>
        </div>
      </div>

      {/* card-2 */}
      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Current Contracts</div>
          <p className="text-gray-700 text-base">
            View and manage your current contracts here. You can add, edit, or delete contracts as needed.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
};

export default Dashboard;
