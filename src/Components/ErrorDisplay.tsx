import { Button, Card } from "antd";
import React, { FunctionComponent } from "react";

interface IProps {
  error: Error;
  retry?: () => void;
}

export const ErrorDisplay: FunctionComponent<IProps> = ({ error, retry }) => {
  return (
    <Card
      className="bg-red-200 text-red-700 max-w-sm"
      title={error.name}
      extra={retry ? [<Button onClick={retry}>Retry</Button>] : []}
    >
      {error.message}
    </Card>
  );
};
