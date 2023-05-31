
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface UpdateUserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
    phoneNumber?: Nullable<string>;
}

export interface User {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface Error {
    message: string;
}

export interface Tokn {
    access: string;
    refresh: string;
}

export interface GetUser {
    username: string;
    email: string;
    phoneNumber: string;
}

export interface AccessTokn {
    access: string;
}

export interface IQuery {
    findAll(): User[] | Promise<User[]>;
    findByemail(email: string): User | Promise<User>;
    user(id: number): User[] | Promise<User[]>;
    login(email: string, password: string): Tokn | Promise<Tokn>;
    getTokenbyRefresh(refresh: string): AccessTokn | Promise<AccessTokn>;
    getuserbyToken(): GetUser | Promise<GetUser>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User[] | Promise<User[]>;
    updateUser(id: number, updateUserInput: UpdateUserInput): User[] | Promise<User[]>;
    removeUser(id: number): Error[] | Promise<Error[]>;
}

type Nullable<T> = T | null;
