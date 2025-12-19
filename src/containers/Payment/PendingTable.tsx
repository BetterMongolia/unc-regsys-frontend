import React from "react";
import {
  useRowSelect,
  useTable,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { matchSorter } from "match-sorter";
import apiPayment from "~/api/payment";
import { useToast } from "@chakra-ui/react";

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

fuzzyTextFilterFn.autoRemove = (val: any) => !val;

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const Table = React.forwardRef(
  (
    {
      columns,
      data,
      setTableSelection,
      tableSelection,
      sportId,
      compId,
      drawer,
    }: any,
    ref: any
  ) => {
    const toast = useToast();
    const instance = useTable(
      {
        columns,
        data,
      },
      useFilters,
      useGlobalFilter,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
      state: { selectedRowIds, toggleRowSelected },
    }: any = instance;

    React.useImperativeHandle(ref, () => instance);

    const checkIsPayable = async () => {
      let difference = selectedFlatRows.filter(
        (x: any) => !tableSelection.includes(x)
      );
      if (difference.length > 0) {
        difference.forEach(async (entry: any) => {
          if (entry.original.team) {
            const res = await apiPayment.isPayable(
              sportId,
              compId,
              entry.original.entries[0]._id
            );

            if (res.success) {
              if (res.data.isPayable === false) {
                entry.toggleRowSelected(false);
                toast({
                  title: "Анхааруулга",
                  description: `/${entry.original.entries[0].name}/ Тухайн төрлийн төлбөрийн мэдээллийг харьяа спортын холбооноос авна уу.`,
                  status: "warning",
                  duration: 8000,
                  isClosable: true,
                });
              }
            } else {
              console.log(res.e);
            }
          }
        });
      }
    };

    React.useEffect(() => {
      setTableSelection(selectedFlatRows);
      checkIsPayable();
      selectedFlatRows.length !== 0 && drawer.onOpen();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFlatRows]);

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
  }
);

export default Table;
