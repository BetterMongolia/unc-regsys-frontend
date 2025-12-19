import React from "react";
import {
  useRowSelect,
  useTable,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { matchSorter } from "match-sorter";
import { Box } from "@chakra-ui/react";

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

fuzzyTextFilterFn.autoRemove = (val: any) => !val;

const Table = React.forwardRef(({ columns, data }: any, ref: any) => {
  const instance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useRowSelect
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    instance;

  React.useImperativeHandle(ref, () => instance);

  return (
    <div className="table-wrap">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any, i: any) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column: any, i: any) => (
                <th {...column.getHeaderProps()} key={i}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell: any, i: any) => {
                  return (
                    <td {...cell.getCellProps()} key={i}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
