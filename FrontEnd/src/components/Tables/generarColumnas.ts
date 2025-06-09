import { ColumnsType } from "antd/es/table";

export const generarColumnas = <T extends object>(props: { [K in keyof T]: string }) => {
    return Object.keys(props).map((key) => ({
      title: props[key as keyof T],
      dataIndex: key,
      key,
    })) as ColumnsType<T>;
  };
  