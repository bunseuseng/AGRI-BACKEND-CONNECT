import { Request, Response } from "express";
import { registerService, loginService } from "../services/authService";

export const registerController = async (req: Request, res: Response) => {
  const result = await registerService(req, res);
  return result;
};

export const loginController = async (req: Request, res: Response) => {
  const result = await loginService(req, res);
  return result;
};
export function register(arg0: string, register: any) {
    throw new Error("Function not implemented.");
}

export function login(arg0: string, login: any) {
    throw new Error("Function not implemented.");
}

