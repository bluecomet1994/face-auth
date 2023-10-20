import { Request, Response } from "express";
export default class UserController {
    static register(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
    static accessToken(req: Request, res: Response): Promise<void>;
    static loginWithFace(req: Request, res: Response): Promise<void>;
}
