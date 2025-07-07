"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Plus } from "lucide-react";

type Column<T> = {
  label: string;
  key: keyof T | string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  onAddNew?: () => void;
};

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  caption,
  onAddNew,
}: DataTableProps<T>) {
  const getCellValue = (row: T, col: Column<T>): React.ReactNode => {
    if (col.render) {
      return col.render(row);
    }
    
    if (col.key in row) {
      return row[col.key as keyof T] as React.ReactNode;
    }
    
    return null;
  };

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col, i) => (
            <TableHead key={i} className={col.className}>
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {onAddNew && (
          <TableRow onClick={onAddNew} className="cursor-pointer hover:bg-muted/50">
            <TableCell colSpan={columns.length} className="text-center py-2">
              <Plus className="w-5 h-5 inline-block text-muted-foreground hover:text-primary transition" />
            </TableCell>
          </TableRow>
        )}
        {data.map((row, idx) => (
          <TableRow key={row.id || idx}>
            {columns.map((col, colIdx) => (
              <TableCell key={colIdx} className={col.className}>
                {getCellValue(row, col)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}