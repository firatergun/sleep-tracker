import { useNavigate } from "react-router-dom";
import { User } from "../api";

type UserTableProps = {
    users?: User[]
}

export const UserTable = ({ users }: UserTableProps) => {
    const navigate = useNavigate();

    const handleClick = (row: number) => {
        navigate(`${row}`);
      }  
  return (
    <>
    <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
                {users?.map((user) => (
                <div
                    key={user.id}
                    onClick={() => handleClick(user.id)}
                    className="mb-2 w-full rounded-md bg-white p-4"
                >
                    <div className="flex items-center justify-between border-b pb-4">
                    <div>
                        <div className="mb-2 flex items-center">
                        <p>{user.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{user.gender}</p>
                    </div>
                    <p className="text-xl">{user.sleepData}</p>
                    </div>
                </div>
                ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                    <th scope="col" className="px-4 py-5 font-bold sm:pl-6">
                    Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-bold">
                    Gender
                    </th>
                    <th scope="col" className="px-3 py-5 font-bold">
                    # Logs
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                    {users?.map((user) => (
                            <tr onClick={() => handleClick(user.id)}
                            key={user.id}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="whitespace-nowrap px-3 py-3">
                                    {user.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {user.gender}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {user.sleepData}
                                </td>
                            </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </>
  )
}
