import { Module } from "../../common/module";
import { User } from "./user";

export class LoginResponse {
    user: User;
    menu: Module[];
}