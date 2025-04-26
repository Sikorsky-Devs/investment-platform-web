import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteContactById } from "@/api/contacts/contacts.api";
import { Contact } from "@/types/contacts";

export const useDeleteContact = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactId: string) => deleteContactById(contactId),
    onMutate: async (contactId: string) => {
      await queryClient.cancelQueries({ queryKey: ["contacts", id] });
      const previousContacts = queryClient.getQueryData<Contact[]>(['contacts', id]);
      queryClient.setQueryData<Contact[]>(['contacts', id], (oldContacts) =>
        oldContacts ? oldContacts.filter((contact) => contact.id !== contactId) : []
      );
      return { previousContacts };
    },
    onError: (err, contactId, context) => {
      queryClient.setQueryData(['contacts', id], context?.previousContacts);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contacts", id] });
    },
  });
};
