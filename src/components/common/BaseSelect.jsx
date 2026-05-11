import { Select } from "antd";

import { universalFilterOption } from "../../utils/selectFilter";

export default function BaseSelect({
  showSearch = true,
  optionFilterProp = "label",
  filterOption = universalFilterOption,
  ...props
}) {
  return (
    <Select
      showSearch={showSearch}
      optionFilterProp={optionFilterProp}
      filterOption={filterOption}
      {...props}
    />
  );
}
