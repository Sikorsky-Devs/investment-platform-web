import {
  type EmailResendRequest,
  type SignInFormData,
  type SignUpFormData,
  type TokenResponse,
} from "@/api/auth/auth.dto";
import { API_URL } from "@/lib/constants";
import { type ErrorResponse } from "@/types/api";
import type { User } from "@/types/user";
import { generateAuthHeaders } from "@/utils/auth.utils";

export const signIn = async (data: SignInFormData) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as TokenResponse;
  } catch (e) {
    throw e;
  }
};

export const signUp = async (data: SignUpFormData) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};

export const emailResend = async (data: EmailResendRequest) => {
  try {
    const response = await fetch(`${API_URL}/auth/email-resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }
    return response;
  } catch (e) {
    throw e;
  }
};

export const emailApprove = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/email-approve/${token}`, {
      method: "POST",
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return response;
  } catch (e) {
    throw e;
  }
};

export const getMe = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...generateAuthHeaders(),
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message);
    }

    return (await response.json()) as User;

    // const mockUser: User = {
    //   id: "12345",
    //   email: "mockuser@example.com",
    //   firstName: "John",
    //   lastName: "Doe",
    //   middleName: "A",
    //   name: "John A. Doe",
    //   description: "This is a mock user.",
    //   role: "user",
    //   isApproved: true,
    //   isLegal: false,
    //   avatarLink: "https://example.com/avatar.jpg",
    // };
    // return mockUser;
  } catch (e) {
    throw e;
  }
};
