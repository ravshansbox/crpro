import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { type PropsWithClassName } from '../types';
import { classNames } from '../utils';
import { Heading } from './Heading';

type ListTableProps<T> = PropsWithClassName & {
  heading: string;
  actions: JSX.Element;
  columns: ColumnDef<T, unknown>[];
  data?: T[];
  showFooter?: boolean;
};
export function ListTable<T>({
  className,
  heading,
  actions,
  columns,
  data = [],
  showFooter = false,
}: ListTableProps<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Heading content={heading}>
      {actions}
      <table className={classNames('w-full', className)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {showFooter && (
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <td key={header.id} className="border p-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </Heading>
  );
}
