const selectClass = `mb-1 border-2 rounded text-sm block w-30 p-1.5
bg-gray-50 border-violet-200 focus:ring-blue-500 focus:border-blue-500
dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`


export const Selector = () => {
  return (
    <div className="flex">
      <select className={selectClass}>
        <option value="recent" selected>
          Recent messages
        </option>
        <option value="received">Received messages</option>
        <option value="sent">Sent messages</option>
        <option value="all">All messages</option>
      </select>
      <select className={selectClass}>
        <option value="all">All phone numbers</option>
        <option value="all">All phone numbers</option>
      </select>
    </div>
  )
}
