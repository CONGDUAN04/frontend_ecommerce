// src/pages/admin/color/index.jsx

import { useEffect, useState } from "react";

import { usePagination } from "../../../hooks/usePagination.js";

import { useColor } from "./hooks/useColor.js";

import CreateColorForm from "./components/color.create.jsx";
import ColorTable from "./components/color.table.jsx";

export default function ColorPage() {
  const [dataColors, setDataColors] = useState([]);

  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();

  const { getAll } = useColor();

  const loadColor = async () => {
    const res = await getAll(current, pageSize);

    if (res?.data) {
      setDataColors(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;

    loadColor();
  }, [current, pageSize]);

  return (
    <>
      <CreateColorForm loadColor={loadColor} />

      <ColorTable
        dataColors={dataColors}
        loadColor={loadColor}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
}
