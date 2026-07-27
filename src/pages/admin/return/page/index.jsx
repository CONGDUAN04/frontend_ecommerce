import { useEffect, useState } from "react";

import { usePagination } from "../../../../hooks/usePagination";

import { useReturn } from "../hook/useReturn";

import ReturnTable from "../components/ReturnTable";

export default function ReturnPage() {
  const [returns, setReturns] = useState([]);

  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();

  const { getAll } = useReturn();

  const loadReturns = async () => {
    console.log("loadReturns");
    const res = await getAll({
      page: current,
      limit: pageSize,
    });

    if (res?.data) {
      setReturns(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    loadReturns();
  }, [current, pageSize]);

  return (
    <ReturnTable
      returns={returns}
      total={total}
      current={current}
      pageSize={pageSize}
      updatePagination={updatePagination}
      loadReturns={loadReturns}
    />
  );
}
