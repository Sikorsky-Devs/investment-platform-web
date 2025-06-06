"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addContact } from "@/api/contacts/contacts.api";
import {
  type AddContactDto,
  addContactSchema,
} from "@/api/contacts/contacts.dto";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ContactsType } from "@/types/contacts";
import { getPlaceholder } from "@/utils/contacts.utils";

const AddContactModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddContactDto>({
    resolver: zodResolver(addContactSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: AddContactDto) => {
    try {
      await addContact({ ...data });
      toast.success("Contact added");
      reset();
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      toast.error("An error occurred");
    }
  };

  const currentContactType = watch("type");

  const handleContactTypeChange = (value: string) => {
    setValue("type", value as ContactsType);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          icon={<PlusCircle className="h-4 w-4" />}
          variant="outline"
          className="w-full"
        >
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Add a new contact method to your profile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="contactType">Contact Type</Label>
            <Select onValueChange={handleContactTypeChange}>
              <SelectTrigger id="contactType">
                <SelectValue placeholder="Select contact type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PHONE">Phone</SelectItem>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="VIBER">Viber</SelectItem>
                <SelectItem value="TELEGRAM">Telegram</SelectItem>
                <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                <SelectItem value="FACEBOOK">Facebook</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-destructive text-sm font-medium">
                {errors.type.message}
              </p>
            )}
          </div>

          <Input
            id="contactContent"
            label="Contact"
            error={errors.content?.message}
            placeholder={getPlaceholder(currentContactType)}
            {...register("content")}
          />

          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactModal;
