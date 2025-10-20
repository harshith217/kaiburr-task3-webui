import React from 'react';
import { Button, Card, Form, Input, Space, Typography, message, Table } from 'antd';
import { api } from '@/api/client';
import type { TaskExecution } from '@/types/models';

const { Paragraph, Title } = Typography;

type ExecuteForm = {
  taskId: string;
};

export function CommandRunner() {
  const [form] = Form.useForm<ExecuteForm>();
  const [executions, setExecutions] = React.useState<TaskExecution[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function execute(values: ExecuteForm) {
    setLoading(true);
    try {
      const res = await api.put<TaskExecution>(`/tasks/${values.taskId}/execute`);
      setExecutions((prev) => [res.data, ...prev]);
      message.success('Command executed');
    } catch (e) {
      const err = e as Error;
      message.error(err.message || 'Failed to execute command');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Execute Task Command">
        <Form form={form} layout="vertical" onFinish={execute}>
          <Form.Item name="taskId" label="Task ID" rules={[{ required: true, message: 'Task ID is required' }]}>
            <Input placeholder="Enter task ID to execute" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>Execute</Button>
          </Form.Item>
        </Form>
      </Card>
      {executions.length > 0 && (
        <Card title="Execution History" aria-live="polite">
          <Table<TaskExecution>
            rowKey={(_, idx) => idx!}
            dataSource={executions}
            pagination={false}
            columns={[
              { title: 'Start Time', dataIndex: 'startTime', render: (t: string) => new Date(t).toLocaleString() },
              { title: 'End Time', dataIndex: 'endTime', render: (t: string) => new Date(t).toLocaleString() },
              { title: 'Output', dataIndex: 'output', render: (o: string) => <Paragraph code style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{o}</Paragraph> }
            ]}
          />
        </Card>
      )}
    </Space>
  );
}
