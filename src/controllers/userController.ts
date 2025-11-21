import { Request, Response } from "express";
import * as userService from "../services/userService";

export const CreateUserController = async (req: Request, res: Response) => {
  const result = await userService.createUserService(req, res);
  return result;
};

export const GetUsersController = async (req: Request, res: Response) => {
  const result = await userService.getUsersService(req, res);
  return result;
};

export const GetUserByIdController = async (req: Request, res: Response) => {
  const result = await userService.getUserByIdService(req, res);
  return result;
};

export const UpdateUserController = async (req: Request, res: Response) => {
  const result = await userService.updateUserService(req, res);
  return result;
};

export const DeleteUserController = async (req: Request, res: Response) => {
  const result = await userService.deleteUserService(req, res);
  return result;
};
