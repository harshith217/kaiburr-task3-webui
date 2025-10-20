import React from 'react';
import { Button, Card, Input, Space, Table, Popconfirm, message, Typography } from 'antd';
import { useQuery, useQueryClient, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '@/api/client';
import type { Task } from '@/types/models';

const { Title } = Typography;

function TasksListInner() {
  const qc = useQueryClient();
  const [search, setSearch] = React.useState('');

  const tasksQuery = useQuery<Task[]>({
    queryKey: ['tasks', search],
    queryFn: async () => {
      if (search) {
        const res = await api.get<Task[]>('/tasks/search', { params: { name: search } });
        return res.data;
      }
      const res = await api.get<Task[]>('/tasks');
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: async () => {
      message.success('Task deleted');
      await qc.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (e: unknown) => {
      const err = e as Error;
      message.error(err.message || 'Failed to delete task');
    }
  });

  return (
    <Card aria-busy={tasksQuery.isLoading} aria-live="polite">
      <Space style={{ marginBottom: 16 }} wrap>
        <Title level={3} style={{ margin: 0 }}>Tasks</Title>
        <Input
          aria-label="Search tasks by name"
          placeholder="Search by name"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          allowClear
          style={{ minWidth: 260 }}
        />
        <Button onClick={() => tasksQuery.refetch()} loading={tasksQuery.isFetching} type="primary">Search</Button>
      </Space>
      <Table<Task>
        rowKey={(r: Task) => r.id}
        dataSource={tasksQuery.data}
        loading={tasksQuery.isLoading}
        pagination={{ pageSize: 10 }}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 220 },
          { title: 'Name', dataIndex: 'name' },
          { title: 'Owner', dataIndex: 'owner' },
          { title: 'Command', dataIndex: 'command' },
          { title: 'Executions', dataIndex: 'taskExecutions', render: (execs: unknown[]) => execs?.length || 0 },
          {
            title: 'Actions',
            render: (_: unknown, r: Task) => (
              <Space>
                <Popconfirm title="Delete this task?" onConfirm={() => deleteMutation.mutate(r.id)}>
                  <Button danger aria-label={`Delete task ${r.name}`}>Delete</Button>
                </Popconfirm>
              </Space>
            )
          }
        ]}
      />
    </Card>
  );
}

const queryClient = new QueryClient();

export function RecordsList() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksListInner />
    </QueryClientProvider>
  );
}
