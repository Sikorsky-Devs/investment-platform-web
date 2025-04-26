import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addContact } from "@/api/contacts/contacts.api";
import { type Contact } from "@/types/contacts";

export const useAddContact = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newContact: Contact) => addContact(newContact),
    onMutate: async (newContact: Contact) => {
      await queryClient.cancelQueries({ queryKey: ["contacts", id] });

      const previousContacts = queryClient.getQueryData<Contact[]>(['contacts', id]);

      queryClient.setQueryData<Contact[]>(['contacts', id], (oldContacts) =>
        oldContacts ? [...oldContacts, newContact] : [newContact]
      );
      
      return { previousContacts };
    },
    onError: (err, newContact, context) => {
      queryClient.setQueryData(['contacts', id], context?.previousContacts);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contacts", id] });
    },
  });
};