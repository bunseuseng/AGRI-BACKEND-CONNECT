import { Request, Response } from "express";
import * as userRoleService from "../services/userRoleService";

export const CreateRoleController = async (req: Request, res: Response) => {
  const result = await userRoleService.assignUserRoleService(req, res);
  return result;
};

// GET ALL
export const GetRolesController = async (req: Request, res: Response) => {
  const result = await userRoleService.getUserRolesService(req, res);
  return result;
};

// GET BY ID
export const GetRoleByIdController = async (req: Request, res: Response) => {
  const result = await userRoleService.getUserRoleByIdService(req, res);
  return result;
};

// UPDATE
export const UpdateRoleController = async (req: Request, res: Response) => {
  const result = await userRoleService.updateUserRoleService(req, res);
  return result;
};

// DELETE
export const DeleteRoleController = async (req: Request, res: Response) => {
  const result = await userRoleService.deleteUserRoleService(req, res);
  return result;
};