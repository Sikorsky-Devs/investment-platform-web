"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signUp } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/utils/styles.utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signUpSchema, type SignUpFormData } from "@/api/auth/auth.dto";

interface SignUpFormProps {
  className?: string;
}

const SignUpForm = ({ className }: SignUpFormProps) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      isLegal: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp({
        ...data,
        isLegal: !!data.isLegal,
      });
      toast.success("Акаунт успішно створено", {
        description:
          "Перевірте свою електронну пошту, щоб підтвердити реєстрацію.",
      });
      replace(ROUTES.AUTH_SUCCESS);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      console.error(e);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Створи новий аккаунт</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Введіть ім&#39;я, електронну пошту та пароль для створення нового
          аккаунту
        </p>
      </div>
      <div className="grid gap-4">
        <Input
          id="email"
          type="email"
          label="Email"
          error={errors.email?.message}
          placeholder="m@example.com"
          {...register("email")}
        />
        <Input
          id="password"
          label="Пароль"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />

        <div className="space-y-2">
          <RadioGroup
            defaultValue="false"
            className="flex gap-4"
            {...register("isLegal", {
              setValueAs: (value) => value === "true",
            })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="isLegal" />
              <Label htmlFor="isLegal">Фізична особа</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="notIsLegal" />
              <Label htmlFor="notIsLegal">Юридична особа</Label>
            </div>
          </RadioGroup>
          {errors.isLegal && (
            <p className="text-destructive text-sm font-medium">
              {errors.isLegal.message}
            </p>
          )}
        </div>

        <Button isLoading={isSubmitting} type="submit" className="w-full">
          Зареєструватися
        </Button>
      </div>
      <div className="text-center text-sm">
        Вже маєш аккаунт?{" "}
        <a href={ROUTES.SIGN_IN} className="underline underline-offset-4">
          Увійти
        </a>
      </div>
    </form>
  );
};

export default SignUpForm;
