import { Button, Pagination, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getProductsDataService } from "../services/ProductsService";
import Loader from "../components/Loader";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router";

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { comparableProducts, setComparableProducts } =
    useContext(ProductsContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getProductsData();
  }, []);

  //   Fetching data by API using async-call
  const getProductsData = async () => {
    const res = await getProductsDataService();
    if (res?.status === 200) {
      if (res?.data && res?.data?.products && res?.data?.products?.length > 0) {
        setProductsData(res?.data?.products);
        setLoading(false);
      } else {
        setProductsData([]);
        setLoading(false);
      }
    } else {
      setProductsData([]);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => (
        <img src={text} alt="product_image" style={{ width: 60, height: 50 }} />
      ),
    },
    {
      title: "Compare Products",
      key: "compareProducts",
      render: (text, record) => (
        <Button
          disabled={comparableProducts?.find((item) => item?.id === record?.id)}
          color="primary"
          onClick={() => handleCompareProducts(record)}
        >
          Compare Product
        </Button>
      ),
    },
  ];

  // for adding comparable products
  const handleCompareProducts = (item) => {
    if (comparableProducts?.length <= 3) {
      setComparableProducts((prevArray) => {
        const productExist = prevArray?.some((obj) => obj?.id === item?.id);

        if (!productExist) {
          return [...prevArray, item];
        }

        return prevArray;
      });
      if (comparableProducts?.length >= 1) {
        navigate("/compareproducts");
      }
    } else {
      alert("Please remove products from comparison to add new product");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Table
            bordered
            columns={columns}
            dataSource={productsData?.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            pagination={false}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            align="end"
            total={productsData?.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
