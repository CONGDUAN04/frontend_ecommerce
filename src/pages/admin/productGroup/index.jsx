import { useEffect, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { useProductGroup } from "./hooks/useProductGroup";
import CreateProductGroupForm from "./components/productGroup.create";
import ProductGroupTable from "./components/productGroup.table";

export default function ProductGroupPage() {
  const [dataGroups, setDataGroups] = useState([]);
  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();
  const { getAll } = useProductGroup();

  const loadGroups = async () => {
    const res = await getAll(current, pageSize);
    if (res?.data) {
      setDataGroups(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;
    loadGroups();
  }, [current, pageSize]);

  return (
    <>
      <CreateProductGroupForm loadGroups={loadGroups} />
      <ProductGroupTable
        dataGroups={dataGroups}
        loadGroups={loadGroups}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
}
