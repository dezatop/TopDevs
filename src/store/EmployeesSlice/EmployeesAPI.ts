//Axios
import axios from 'axios';
//Types
import {IUser} from './types'

class EmployeesAPI {
  static getUsers() {
    return axios.get<IUser[]>('https://topdevsprojects.org/tasks/users')
  }
}

export default EmployeesAPI
