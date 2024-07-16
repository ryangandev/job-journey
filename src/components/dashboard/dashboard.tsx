'use client';

import { useState, useMemo, useCallback, Key, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
  Spinner,
  Divider,
} from '@nextui-org/react';
import { FaCheck } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
} from '../../assets/svgs';
import CustomDropdown from '../custom-dropdown';
import {
  statusOptions,
  jobStatusMap,
  jobSettingMap,
  jobTypeMap,
  jobLevelMap,
  statusColorMap,
} from '../../data/application';
import {
  columns,
  searchFilterOptions,
  searchFilterOptionsMap,
} from '../../data/dashboard';
import useConfirmModal from '../../hooks/use-confirm-modal';
import { ApplicationPreview } from '../../models/application';
import { SearchFilterOption } from '../../models/dashboard';
import { deleteApplicationByIdAction } from '../../actions/applications-actions';
import { dateToTwoDigitsString } from '../../libs/time-utils';

export default function ApplicationsDashboard({
  applicationsData,
}: {
  applicationsData: ApplicationPreview[] | { error: string };
}) {
  const [applications, setApplications] = useState<ApplicationPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilterOption, setSearchFilterOption] =
    useState<SearchFilterOption>('company');
  const [searchFilterValue, setSearchFilterValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'appliedAt',
    direction: 'descending',
  });
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { onOpen, setTitle, setQuestion, setAction } = useConfirmModal();

  useEffect(() => {
    if ('error' in applicationsData) {
      toast.error(applicationsData.error);
      setApplications([]);
      setLoading(false);
    } else {
      setApplications(applicationsData);
      setLoading(false);
    }
  }, [applicationsData]);

  const hasSearchFilter = Boolean(searchFilterValue);

  const filteredItems = useMemo(() => {
    let filteredApplications = [...applications];

    if (hasSearchFilter) {
      filteredApplications = filteredApplications.filter((application) => {
        const value = application[searchFilterOption] as string;

        return value.toLowerCase().includes(searchFilterValue.toLowerCase());
      });
    }

    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredApplications = filteredApplications.filter((application) =>
        Array.from(statusFilter).includes(application.status),
      );
    }

    return filteredApplications;
  }, [applications, searchFilterValue, statusFilter, searchFilterOption]);

  const sortedFilteredItems = useMemo(() => {
    return [...filteredItems].sort(
      (a: ApplicationPreview, b: ApplicationPreview) => {
        const first = a[sortDescriptor.column as keyof ApplicationPreview];
        const second = b[sortDescriptor.column as keyof ApplicationPreview];
        const cmp = first > second ? 1 : first < second ? -1 : 0;

        return sortDescriptor.direction === 'ascending' ? cmp : -cmp;
      },
    );
  }, [sortDescriptor, filteredItems]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedFilteredItems.slice(start, end);
  }, [page, sortedFilteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const handleViewApplicationDetail = useCallback(
    (id: string) => {
      router.push(`/dashboard/application-detail/${id}`);
    },
    [router],
  );

  const handleDeleteApplication = useCallback(async (id: string) => {
    if (!id) return;

    try {
      const response = await deleteApplicationByIdAction(id);
      if (response.error) {
        toast.error(response.error);
      } else if (response.message) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error(error);
    }
  }, []);

  const handleDeleteApplicationRequest = useCallback(
    (id: string) => {
      setTitle('Delete Application');
      setQuestion('Are you sure you want to delete this application?');
      setAction(() => async () => await handleDeleteApplication(id));
      onOpen();
    },
    [handleDeleteApplication, onOpen, setAction, setQuestion, setTitle],
  );

  const renderBooleanCell = useCallback((value: boolean) => {
    return value ? (
      <FaCheck className="text-green-500" size={16} />
    ) : (
      <RxCross1 className="text-rose-500" size={16} />
    );
  }, []);

  const renderCell = useCallback(
    (application: ApplicationPreview, columnKey: Key) => {
      const cellValue = application[columnKey as keyof ApplicationPreview];

      switch (columnKey) {
        case 'isFavorite':
          return (
            <div>
              {application.isFavorite ? (
                <MdFavorite className="text-red-500" size={18} />
              ) : (
                <MdFavoriteBorder
                  className="text-light-200 dark:text-dark-200"
                  size={18}
                />
              )}
            </div>
          );
        case 'title':
          return (
            <div className="flex flex-col">
              <Link
                className="text-bold line-clamp-1 text-small capitalize"
                href={`/dashboard/application-detail/${application.id}`}
              >
                {cellValue as string}
              </Link>
              <div className="hidden select-none flex-row items-center space-x-2 lg:flex">
                <span className="text-bold text-tiny text-default-500">
                  {jobSettingMap[application.setting]}
                </span>
                <Divider className="h-2" orientation="vertical" />
                <span className="text-bold text-tiny text-default-500">
                  {jobTypeMap[application.type]}
                </span>
                <Divider className="h-2" orientation="vertical" />
                <span className="text-bold text-tiny text-default-500">
                  {jobLevelMap[application.level]}
                </span>
              </div>
            </div>
          );
        case 'company':
          return (
            <div className="flex flex-col">
              <p className="text-bold line-clamp-1 text-small capitalize">
                {cellValue as string}
              </p>
              <p className="text-bold line-clamp-1 hidden text-tiny capitalize text-default-500 lg:block">
                {application.location}
              </p>
            </div>
          );
        case 'status':
          return (
            <div>
              <Chip
                className="select-none gap-1 border-none text-default-600"
                color={statusColorMap[application.status]}
                size="md"
                variant="dot"
              >
                {jobStatusMap[cellValue as string]}
              </Chip>
            </div>
          );
        case 'replied':
          return (
            <div className="flex pl-4">
              {renderBooleanCell(cellValue as boolean)}
            </div>
          );
        case 'interviewAquired':
          return (
            <div className="flex pl-6">
              {renderBooleanCell(cellValue as boolean)}
            </div>
          );
        case 'appliedAt':
          return (
            <div>
              <p className="text-bold text-small">
                {dateToTwoDigitsString(application.appliedAt)}
              </p>
            </div>
          );
        case 'updatedAt':
          return (
            <div>
              <p className="text-bold text-small">
                {dateToTwoDigitsString(application.updatedAt)}
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <VerticalDotsIcon
                      className="text-default-400"
                      width={undefined}
                      height={undefined}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu closeOnSelect aria-label="Actions Menu">
                  <DropdownItem
                    onPress={() => handleViewApplicationDetail(application.id)}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => {
                      handleDeleteApplicationRequest(application.id);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <></>;
      }
    },
    [],
  );

  const handleOnRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const handleOnSearchChange = useCallback((value: string) => {
    if (value) {
      setSearchFilterValue(value);
      setPage(1);
    } else {
      setSearchFilterValue('');
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1 px-2',
            }}
            placeholder={`Search by ${searchFilterOptionsMap[searchFilterOption]}`}
            size="md"
            startContent={
              <CustomDropdown
                triggerType="custom"
                customTrigger={
                  <button className="flex space-x-1 p-1">
                    <SearchIcon className="text-default-800" />
                    <ChevronDownIcon
                      className="text-default-800"
                      width="0.75em"
                    />
                  </button>
                }
                buttonVariant="light"
                label="Search Filter"
                value={searchFilterOption}
                valueOptions={searchFilterOptions}
                handleUpdate={(selectedKey) => {
                  setSearchFilterOption(selectedKey as SearchFilterOption);
                }}
                displayMapper={(value) => searchFilterOptionsMap[value]}
              />
            }
            value={searchFilterValue}
            variant="bordered"
            onClear={() => setSearchFilterValue('')}
            onValueChange={handleOnSearchChange}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="md"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status}>
                    {jobStatusMap[status]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground font-medium text-background"
              onPress={() => router.push('/dashboard/new-application')}
              endContent={<PlusIcon width={undefined} height={undefined} />}
              size="md"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {applications.length} applications
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={handleOnRowsPerPageChange}
            >
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    searchFilterOption,
    searchFilterValue,
    statusFilter,
    handleOnSearchChange,
    handleOnRowsPerPageChange,
    applications.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  );

  return (
    <Table
      isCompact={false}
      removeWrapper
      fullWidth
      aria-label="Applications Dashboard"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
            width={column.width}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={loading}
        loadingContent={<Spinner label="Loading job applications..." />}
        emptyContent={loading ? '' : "There's no applications to show."}
        items={items}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
