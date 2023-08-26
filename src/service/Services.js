import { Api } from './Api';

export const SignIn = (data) => Api().post('/user/login', data);
export const SignUp = (data) => Api().post('/user/register', data);
export const GetUsers = (query) => Api().get(`/user?${query}`);
export const GetUser = (params) => Api().get(`/user/${params}`);


export const TodosGet = (query) => Api().get(`/todo?${query}`);
export const TodoGet = (params) => Api().get(`/todo/${params}`);
export const TodoCreate = (data) => Api().post('/todo', data);
export const TodoUpdate = (params, data) => Api().patch(`/todo/${params}`, data);
export const TodoDelete = (params) => Api().delete(`/todo/${params}`);