import { useEffect, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { useVariant } from "./hooks/useVariant";
import CreateVariantForm from "./components/variant.create";
import VariantTable from "./components/variant.table";

export default function VariantPage() {
  const [dataVariants, setDataVariants] = useState([]);
  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();

  const { getAll } = useVariant();

  const loadVariants = async () => {
    const res = await getAll(current, pageSize);

    if (res?.data) {
      setDataVariants(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;

    loadVariants();
  }, [current, pageSize]);

  return (
    <>
      <CreateVariantForm loadVariants={loadVariants} />

      <VariantTable
        dataVariants={dataVariants}
        loadVariants={loadVariants}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
}
