import { useMutation, useQueryClient } from '@tanstack/react-query';

import {editContactById} from "@/api/contacts/contacts.api";
import {Contact} from "@/types/contacts";

export const useEditContact = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ contactId, newContent }: { contactId: string; newContent: string }) =>
      editContactById(contactId, newContent),
    onMutate: async ({ contactId, newContent }) => {
      await queryClient.cancelQueries({ queryKey: ['contacts', userId] });
      const previousContacts = queryClient.getQueryData<Contact[]>(['contacts', userId]);
      queryClient.setQueryData<Contact[]>(['contacts', userId], oldContacts => {
        if (oldContacts) {
          return oldContacts.map(contact =>
            contact.id === contactId ? { ...contact, content: newContent } : contact
          );
        }
        return [];
      });
      return { previousContacts };
    },
    onError: (error, variables, context) => {
      if (context?.previousContacts) {
        queryClient.setQueryData(['contacts', userId], context.previousContacts);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['contacts', userId] });
    },
  });
};