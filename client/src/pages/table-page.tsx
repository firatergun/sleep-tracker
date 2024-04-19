import { useFetchUsers } from "../api";
import { UserTable } from "../components/table";

export default function TablePage() {
    const { data: users, isLoading } = useFetchUsers();
    if (isLoading) {
        return <div>Loading...</div>;
      }
  return (
    <div>
      <UserTable users={users} />
    </div>
  )
}
