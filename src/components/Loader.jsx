import { Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <div style={{ marginTop: "40vh", marginLeft: "80vh" }}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
