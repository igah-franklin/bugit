"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useMemo } from "react"
import { Input } from "../../ui/input"
import { DataTableFacetedFilter } from "../data-table-faceted-filter"
import { ITransaction } from "@/utils/transactions"
import { DataTableViewOptions } from "../column-toggle"
import { Button } from "../../ui/button"
import CustomDropdown from "@/components/custom-dropdown/custom-dropdown"
import DownloadPdf, { DownloadCsv } from "@/components/documents/transaction-pdf"
import { ITransactions } from "@/types/ITransaction"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function TransactionTable<TData extends ITransactions, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
        pagination: {
            pageSize: 10,
        }
    },
    state: {
        sorting,
        columnFilters,
      },
  });

  const categoriesOptions = useMemo(() => {
    return Array.from(new Set(data.map((transaction) => transaction.category))).map((category) => ({
      label: category?.categoryName,
      value: category?.categoryName,
    }));
  }, [data]);
  

  return (
    <div className="">
        <div className="mb-10 flex justify-between lg:items-center gap-2 lg:gap-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
            {
                table.getColumn('category') && (
                    <DataTableFacetedFilter
                        title="Filter by Category"
                        column={table.getColumn('category')}
                        options={categoriesOptions}
                    />
                )
            }
            {
                table.getColumn('type') && (
                    <DataTableFacetedFilter
                        title="Filter by Type"
                        column={table.getColumn('type')}
                        options={[
                            {
                                label: 'Income',
                                value: 'income'
                            },
                            {
                                label: 'Expense',
                                value: 'expense'
                            },
                        ]}
                    />
                )
            }
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <DataTableViewOptions table={table} />
            <CustomDropdown title="Download" bgColor="bg-black">
              <DownloadPdf/>
              <DownloadCsv/>
            </CustomDropdown>
          </div>
        </div>
        {/* to ensure that the table is responsive add grid grid-cols-1 to the parent element */}
        <div className="rounded-md border grid grid-cols-1"> 
            <Table className="">
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
