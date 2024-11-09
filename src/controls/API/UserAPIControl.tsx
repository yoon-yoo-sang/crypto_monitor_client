import {UserBase} from '../../types/store';
import {request} from '../RequestControl';

export const Login = async (params: UserBase) =>
  request('v1/users/login', 'POST', params);
