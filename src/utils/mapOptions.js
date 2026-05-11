export const mapOptions = (data) =>
  data.map((item) => ({
    label: item.name,
    value: item.id,
  }));
