import { useEffect, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { useProduct } from "./hooks/useProduct";
import CreateProductForm from "./components/product.create";
import ProductTable from "./components/product.table";

export default function ProductPage() {
  const [dataProducts, setDataProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();
  const { getAll } = useProduct();

  const loadProducts = async () => {
    const res = await getAll(current, pageSize);
    if (res?.data) {
      setDataProducts(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;
    loadProducts();
  }, [current, pageSize]);

  return (
    <>
      <CreateProductForm loadProducts={loadProducts} />
      <ProductTable
        dataProducts={dataProducts}
        loadProducts={loadProducts}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
}
