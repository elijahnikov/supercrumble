import { withApollo } from '@/utils/withApollo';
import React, { useEffect, useState } from 'react';
import { BsAlarm, BsX } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type Column = {
    id: number;
    title: string;
    sortable: boolean;
    value: string;
    rowId?: string | number;
    cell: Function;
    show: boolean;
    fullDataRow?: boolean;
    width?: string | number;
};

interface TableProps {
    data?: any[];
    columns: Column[];
    total?: number;
    changePageQuery?: Function;
    filterQuery: string;
    defaultSortKey?: string;
    defaultSortOrder?: string;
    defaultLimit?: number;
    pagination?: boolean;
    large?: boolean;
    emptyText?: string;
    emptyIcon?: IconType;
    selectable?: string;
    noStickyHeader?: boolean;
    reload?: number;
    loading?: boolean;
    skeletonLength?: number;
    onRowClick?: Function;
}

const SuperTable = ({
    data = [],
    columns,
    total,
    changePageQuery = () => {},
    filterQuery,
    defaultSortKey,
    defaultSortOrder,
    defaultLimit,
    pagination,
    large,
    emptyText = 'NO RESULTS',
    emptyIcon = BsX,
    selectable,
    noStickyHeader = false,
    reload,
    loading = false,
    skeletonLength,
    onRowClick,
}: TableProps) => {
    const [rows, setRows] = useState<any[]>(data);

    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [limit, setLimit] = useState<number>(defaultLimit || 50);
    const [sortKey, setSortKey] = useState<string | null>(
        defaultSortKey || null
    );
    const [sortOrder, setSortOrder] = useState<string>(
        defaultSortOrder || 'ASC'
    );

    const [pageQuery, setPageQuery] = useState<string>('');

    const [maxHeight, setMaxHeight] = useState<number | string>('unset');
    const [selectedCount, setSelectedCount] = useState<number>(0);
    const [allSelected, setAllSelected] = useState<boolean>(false);

    const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(Number(e.target.value));
        setPage(1);
    };

    const changeSort = (column: Column) => {
        if (column.sortable) {
            if (sortKey === column.value) {
                setSortOrder(sortOrder === 'DESC' ? 'ASC' : 'DESC');
            }
            setSortKey(column.value);
            setPage(1);
        }
    };

    useEffect(() => {
        setRows(data);
    }, [data]);

    return (
        <Table>
            <TableHead className='text-white'>
                <TableRow>
                    {columns.map(
                        (column: Column) =>
                            column.show && (
                                <TableCell
                                    style={{
                                        color: 'white',
                                        textAlign: 'left',
                                        fontSize: '12px',
                                    }}
                                    key={column.id + '-head'}
                                >
                                    {column.title}
                                </TableCell>
                            )
                    )}
                </TableRow>
            </TableHead>

            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={row.id ? row.id : index}>
                        {columns.map(
                            (column: Column) =>
                                column.show && (
                                    <TableCell
                                        className='h-[18px] border-slate-700 text-white'
                                        style={{
                                            width: column.width
                                                ? column.width
                                                : 'fit-content',
                                        }}
                                        key={column.id}
                                    >
                                        {column.fullDataRow
                                            ? column.cell(row)
                                            : column.cell(row[column.value])}
                                    </TableCell>
                                )
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default withApollo({ ssr: true })(SuperTable);
