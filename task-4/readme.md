## Task description

#### Frontend component

Let’s try to show our data.

- Please, use the getUsers function from useEnterprise hook which requires two parameters, taxId and page. Load the enterprise members and pass this data to the dynamic table component.
- Please, place this table in the center of the screen and add red border around the table with 20px distance from table data

```
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { IEntepriseUsersResponse } from '../../../interfaces/users.interface';
import useEnterprise from '../../../hooks/useEnterprise;
import DynamicTable from '../../../components/builders/DynamicTable';
import { columns, ITEMS_PER_PAGE } from '../../../utils/constants';

type Props {
 taxId: number;
}

export default function UserPage({ taxId }: Props) {
 const { t } = useTranslation();
 const { getUsers } = useEnterprise();;
 const [users, setUsers] = useState<IEntepriseUsersResponse>({
   data: [],
   total: 0,
 });
 const [isLoading, setLoading] = useState<boolean>(true);
 const [page, setPage] = useState(1);

 const handlePageChange = (
   event: React.ChangeEvent<unknown>,
   value: number,
 ) => {
   setPage(value);
 };

 return (
    <DynamicTable
           data={users.data}
           columns={columns}
       />
       <Pagination
         count={Math.ceil(users.total / ITEMS_PER_PAGE)}
         page={page}
         onChange={handlePageChange}
       />
);
}
```
