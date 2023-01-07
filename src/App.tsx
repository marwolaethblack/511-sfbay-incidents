import React from "react";
import "antd/dist/reset.css";
import { TrafficEventsTable } from "./Components/TrafficEventsTable";
import { Layout } from "antd";
import { Header, Content } from "antd/es/layout/layout";

function App() {
  return (
    <Layout>
      <Header className="flex items-center">
        <div className="text-white text-xl">511 SF Bay Traffic Events</div>
      </Header>
      <Content>
        <div className="px-40 flex items-center justify-center flex-col min-h-[500px]">
          <TrafficEventsTable />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
