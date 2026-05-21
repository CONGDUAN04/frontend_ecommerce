import { useEffect, useState } from "react";

import { usePagination } from "../../../hooks/usePagination";
import { useProductColor } from "./hooks/useProductColor";

import CreateProductColor from "./components/productColor.create";
import ProductColorTable from "./components/productColor.table";

export default function ProductColorPage() {
  const [dataProductColors, setDataProductColors] = useState([]);
  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();

  const { getAll } = useProductColor();

  const loadProductColors = async () => {
    const res = await getAll(current, pageSize);

    if (res?.data) {
      setDataProductColors(res.data);
      setTotal(res.meta?.total || 0);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;

    loadProductColors();
  }, [current, pageSize]);

  return (
    <>
      <CreateProductColor loadProductColors={loadProductColors} />
      <ProductColorTable
        dataProductColors={dataProductColors}
        loadProductColors={loadProductColors}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
}
