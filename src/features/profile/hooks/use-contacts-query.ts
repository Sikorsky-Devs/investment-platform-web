import { getContacts } from "@/api/contacts/contacts.api";
import { useQuery } from "@tanstack/react-query";

const useContactsQuery = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(id),
  });

  return {
    contacts: data,
    isLoading,
    isError,
  };
};
export default useContactsQuery;
