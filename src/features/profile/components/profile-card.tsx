"use client";
import { LogOutIcon, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/user-avatar";
import { ROUTES } from "@/constants/navigation";
import EditContactInline from "@/features/profile/components/edit-contact-inline";
import ProfileCardSkeleton from "@/features/profile/components/profile-card-skeleton";
import UpdateProfileModal from "@/features/profile/components/update-profile-modal";
import { useDeleteContact } from "@/features/profile/hooks/use-delete-contact";
import { useEditContact } from "@/features/profile/hooks/use-edit-contact";
import useAuthStore from "@/store/use-auth-store";
import { logoutUser, removeAuthToken } from "@/utils/auth.utils";
import { contactIconMap } from "@/utils/contacts.utils";
import { getFullName } from "@/utils/user.utils";

import AddContactModal from "./add-contact-modal";
import useContactsQuery from "../hooks/use-contacts-query";

const ProfileCard = () => {
  const { replace } = useRouter();
  const { user, isLoading } = useAuthStore();

  const { contacts, isLoading: isContactsLoading } = useContactsQuery(
    user?.id as string,
  );

  const deleteContactMutation = useDeleteContact(user?.id as string);
  const editContactMutation = useEditContact(user?.id as string);

  const [editingContact, setEditingContact] = useState<string | null>(null);

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  const fullName = getFullName(
    user?.firstName,
    user?.lastName,
    user?.middleName,
    user?.name,
  );

  const handleContactDelete = async (contactId: string) => {
    try {
      await deleteContactMutation.mutateAsync(contactId);
    } catch (error) {
      console.error("Помилка при видаленні контакту:", error);
    }
  };

  const handleEditSave = async (contactId: string, editValue: string) => {
    try {
      await editContactMutation.mutateAsync({
        contactId,
        newContent: editValue,
      });
      setEditingContact(null);
    } catch (error) {
      console.error("Помилка при оновленні контакту:", error);
    }
  };

  const handleSignOut = () => {
    removeAuthToken();
    replace(ROUTES.HOME);
    logoutUser();
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="relative">
          <Badge className="absolute -top-2 -left-2">Approved</Badge>
          <div className="flex flex-col items-center">
            <div>
              <UserAvatar
                size={24}
                image={user?.avatarLink}
                className="h-24 w-24"
              />
            </div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {contacts && contacts.length > 0 ? (
            contacts.map((item) => {
              const Icon = contactIconMap[item.type];
              const isEditing = editingContact === item.id;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <Icon className="text-muted-foreground h-4 w-4" />
                  {isEditing ? (
                    <EditContactInline
                      initialContent={item.content}
                      onSave={(newContent) =>
                        handleEditSave(item.id, newContent)
                      }
                      onCancel={() => setEditingContact(null)}
                    />
                  ) : (
                    <>
                      <span className="flex-1 truncate text-sm">
                        {item.content}
                      </span>
                      <Button
                        icon={<Pencil className="h-4 w-4" />}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-2"
                        onClick={() => setEditingContact(item.id)}
                      />
                      <Button
                        icon={<Trash className="h-4 w-4" />}
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-2 hover:text-red-500"
                        onClick={() => handleContactDelete(item.id)}
                      />
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <span className="block flex-1 text-center text-gray-400">
              Немає контактів
            </span>
          )}
        </div>
        <div className="flex w-full flex-wrap gap-2">
          <AddContactModal />
          <UpdateProfileModal />
          <Button
            icon={<LogOutIcon />}
            className="w-full"
            variant="destructive"
            onClick={handleSignOut}
          >
            Вийти
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
