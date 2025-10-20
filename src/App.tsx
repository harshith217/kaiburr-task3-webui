import React from 'react';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { RecordsList } from './pages/RecordsList';
import { RecordForm } from './pages/RecordForm';
import { CommandRunner } from './pages/CommandRunner';

const { Header, Content, Footer } = Layout;

function useSelectedKey() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/records')) return 'records';
  if (pathname.startsWith('/commands')) return 'commands';
  return 'records';
}

export default function App() {
  const selectedKey = useSelectedKey();

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Layout style={{ minHeight: '100dvh' }}>
        <Header role="navigation" aria-label="Main">
          <div style={{ float: 'left', color: '#fff', fontWeight: 600, marginRight: 24 }}>
            Task 3 Web UI
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={[
              { key: 'records', label: <Link to="/">Tasks</Link> },
              { key: 'create', label: <Link to="/tasks/new">Create Task</Link> },
              { key: 'commands', label: <Link to="/execute">Execute</Link> }
            ]}
          />
        </Header>
        <Content style={{ padding: 24 }}>
          <Routes>
            <Route path="/" element={<RecordsList />} />
            <Route path="/tasks/new" element={<RecordForm />} />
            <Route path="/execute" element={<CommandRunner />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} Task 3</Footer>
      </Layout>
    </ConfigProvider>
  );
}
