import { getCustomers } from '../../api/rest/customer/customerResource'

export default [
  {
    method: 'get',
    controller: getCustomers,
    path: '/customers'
  }
]