import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { IEnterpriseUsersResponse } from '../../../interfaces/users.interface';
import useEnterprise from '../../../hooks/useEnterprise';
import DynamicTable from '../../../components/builders/DynamicTable';
import { columns, ITEMS_PER_PAGE } from '../../../utils/constants';
import { useTranslation } from 'react-i18next'; // import fixed

type Props = {
  taxId: number;
};

export default function UserPage({ taxId }: Props) {
  const { t } = useTranslation(); // example of using t('modelName.prop', 'Default Value')
  const { getUsers } = useEnterprise();
  const [users, setUsers] = useState<IEnterpriseUsersResponse>({
    data: [],
    total: 0,
  });
  const [isLoading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await getUsers(taxId, page);

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers({
          data: data.users,
          total: data.total,
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taxId, page]);

  const handlePageChange = (_, value: number) => {
    setPage(value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* border */}
      {isLoading ? (
        // preloader
        <div>LOADING...</div>
      ) : (
        <div style={{ border: '2px solid red', padding: '20px' }}>
          <DynamicTable data={users.data} columns={columns} />
        </div>
      )}
      <Pagination
        count={Math.ceil(users.total / ITEMS_PER_PAGE)}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
