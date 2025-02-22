import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
interface DataType {
  tripName: string;
  placeName: string;
  fromDate: string;
  toDate: string;
  noOfTravellers: number;
}
function formatDate(timestamp) {
  const date = new Date(timestamp);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month < 10 ? "0" + month : month}/${
    day < 10 ? "0" + day : day
  }/${year}`;
}

const CustomTable: React.FC = ({ data, onEditClick, onDeleteClick }) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Trip Name",
      dataIndex: "trip_name",
      key: "trip_name",
      render: (text, record) => (
        <Link to={`/trips/${record.trip_id}`}>{text}</Link>
      ),
    },
    {
      title: "Place Name",
      dataIndex: "place_name",
      key: "place_name",
    },
    {
      title: "From Date",
      dataIndex: "from_date",
      key: "from_date",
      render: (value) => {
        return formatDate(value);
      },
    },

    {
      title: "To Date",
      dataIndex: "to_date",
      key: "to_date",
      render: (value) => {
        return formatDate(value);
      },
    },

    {
      title: "No. Of Travellers",
      dataIndex: "no_of_travellers",
      key: "no_of_travellers",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Pencil onClick={() => onEditClick(record)} />
          <Trash onClick={() => onDeleteClick(record)} />
        </Space>
      ),
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.trip_id}
    />
  );
};

export default CustomTable;
export { type DataType };
