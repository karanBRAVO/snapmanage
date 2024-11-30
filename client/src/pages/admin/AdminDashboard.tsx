'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { ChartBar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { toast } from '@/components/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export type Payment = {
  _id: string;
  username: string;
  name: string;
  fatherName: string;
  phoneNumber: string;
  // email: string;
  // dob: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('username')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'fatherName',
    header: 'Father Name',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('fatherName')}</div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone number',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('phoneNumber')}</div>
    ),
  },
  // {
  //   accessorKey: 'email',
  //   header: 'Email',
  //   cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  // },
  // {
  //   accessorKey: 'dob',
  //   header: 'Date of Birth',
  //   cell: ({ row }) => <div>{format(row.getValue('dob'), 'PPP')}</div>,
  // },
];

export interface IStats {
  imgUrl: string;
  date: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loadingStats, setLoadingStats] = React.useState(false);
  const [data, setData] = React.useState<Payment[]>([]);
  const [stats, setStats] = React.useState<IStats[]>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  async function getData() {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Error',
        description: (
          <div>
            <span>Not logged in.</span>
          </div>
        ),
      });

      navigate('/admin/login');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/user-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function getStats(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'Error',
        description: (
          <div>
            <span>Not logged in.</span>
          </div>
        ),
      });

      navigate('/admin/login');
      return;
    }

    if (!userId) return;

    setLoadingStats(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/user-stats?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        setStats(response.data.data);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoadingStats(false);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full p-1 sm:p-4 h-full">
      <h1 className="w-full font-extrabold text-base hover:underline sm:p-4">
        Admin Dashboard
      </h1>
      {loading ? (
        <div
          role="status"
          className="w-full items-center justify-center flex mt-4"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="flex items-center py-4 space-x-1">
            <Input
              placeholder="Filter name..."
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
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
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              onClick={() => {
                                getStats(row.original._id);
                              }}
                              variant={'outline'}
                              size={'icon'}
                            >
                              <ChartBar />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-full h-screen p-0 md:p-6">
                            <div className="h-full overflow-y-auto">
                              <DialogHeader className="p-6 md:p-0">
                                <DialogTitle className="text-xl md:text-2xl">
                                  {row.original.username}
                                </DialogTitle>
                                <DialogDescription className="mt-4">
                                  {loadingStats ? (
                                    <span className="text-black dark:text-white">
                                      Loading ...
                                    </span>
                                  ) : stats.length > 0 ? (
                                    <ul className="space-y-6 p-6 md:p-0">
                                      {stats.map((stat, index) => (
                                        <li
                                          key={index}
                                          className="flex flex-col space-y-2"
                                        >
                                          <span className="font-medium">
                                            {format(stat.date, 'PPP')}
                                          </span>
                                          <img
                                            src={stat.imgUrl}
                                            alt={`Stat ${index + 1}`}
                                            className="w-full max-w-2xl h-auto aspect-square object-contain"
                                            loading="lazy"
                                          />
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p>No stats available.</p>
                                  )}
                                </DialogDescription>
                              </DialogHeader>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
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
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
