import React from 'react';
import { Pagination, Stack } from '@mui/material';

const PaginationControls = ({ page, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} alignItems="center" mt={4}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Stack>
  );
};

export default PaginationControls;
