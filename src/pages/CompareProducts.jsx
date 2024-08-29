import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Button, Modal, Table } from "antd";
import { useNavigate } from "react-router";
import ProductsPage from "./ProductsPage";

const CompareProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { comparableProducts, setComparableProducts } =
    useContext(ProductsContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (comparableProducts?.length === 0) {
      navigate("/productdetails");
    }
    // eslint-disable-next-line
  }, [comparableProducts]);

  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      fixed: "left",
    },
    ...comparableProducts.map((product, index) => ({
      title: `Product ${index + 1}`,
      dataIndex: `product${index + 1}`,
      key: `product${index + 1}`,
    })),
  ];

  //   This will create the dynamic data for comparison
  const data = [
    {
      key: "1",
      attribute: "Image",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = (
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100px" }}
          />
        );
        return acc;
      }, {}),
    },
    {
      key: "2",
      attribute: "Title",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = product.title;
        return acc;
      }, {}),
    },
    {
      key: "3",
      attribute: "Description",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = product.description;
        return acc;
      }, {}),
    },
    {
      key: "4",
      attribute: "Price",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = product.price;
        return acc;
      }, {}),
    },
    {
      key: "5",
      attribute: "Discount",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = product.discountPercentage;
        return acc;
      }, {}),
    },
    {
      key: "6",
      attribute: "Brand",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = product.brand;
        return acc;
      }, {}),
    },
    {
      key: "7",
      attribute: "Category",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = product.category;
        return acc;
      }, {}),
    },
    {
      key: "8",
      attribute: "Action",
      ...comparableProducts.reduce((acc, product, index) => {
        acc[`product${index + 1}`] = (
          <Button danger onClick={() => handleAction(product)}>
            Remove
          </Button>
        );
        return acc;
      }, {}),
    },
  ];
  //   for removing the product from the comparable products
  const handleAction = (product) => {
    let data = comparableProducts?.filter((item) => item?.id !== product?.id);
    setComparableProducts(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="dashed" className="mb-4" onClick={showModal}>
        Add more
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: true }}
      />
      <Modal
        width={"70vw"}
        title="Add More Products"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProductsPage />
      </Modal>
    </div>
  );
};

export default CompareProducts;
