import React from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/client';
import type { Task } from '@/types/models';

type TaskCreate = Omit<Task, 'taskExecutions'>;

export function RecordForm() {
  const [form] = Form.useForm<TaskCreate>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = React.useState(false);

  async function onFinish(values: TaskCreate) {
    setSubmitting(true);
    try {
      // Backend uses PUT /tasks for create/update
      const payload: TaskCreate = {
        id: values.id?.trim(),
        name: values.name?.trim(),
        owner: values.owner?.trim(),
        command: values.command?.trim()
      };
      await api.put('/tasks', payload);
      message.success('Task created');
      navigate('/');
    } catch (e) {
      const err = e as Error;
      message.error(err.message || 'Failed to create task');
      console.error('Create task error:', e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card title="Create Task" role="region" aria-labelledby="create-task">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        aria-busy={submitting}
        initialValues={{ command: 'echo Hello World' }}
      >
        <Form.Item name="id" label="ID" rules={[{ required: true, message: 'ID is required' }]}> 
          <Input placeholder="Enter unique ID" autoFocus />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required' }]}> 
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item name="owner" label="Owner" rules={[{ required: true, message: 'Owner is required' }]}> 
          <Input placeholder="Enter owner name" />
        </Form.Item>
        <Form.Item 
          name="command" 
          label="Command" 
          rules={[
            { required: true, message: 'Command is required' },
            { pattern: /^echo\s+.+/, message: 'Only "echo ..." commands are allowed (must start with "echo ")' }
          ]}
          help="Only 'echo' commands allowed (no special chars: &&, ||, ;, |, etc.)"
        > 
          <Input placeholder="echo Hello World" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
