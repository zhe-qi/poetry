"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { PoetryListInitialValue } from "../../page";
import { Pagination } from "../pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useUpdateEffect } from "ahooks";
import React from "react";

interface ListProps {
  initialValue: PoetryListInitialValue;
  defaultPagination: {
    page: number;
    pageSize: number;
  };
}

export function List({ initialValue, defaultPagination }: ListProps) {
  const [tableData, setTableData] = useState(initialValue.data);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(() => ({
    ...defaultPagination,
    total: initialValue.total,
  }));

  useEffect(() => {
    // 当组件挂载时，将数据保存到 sessionStorage
    sessionStorage.setItem("listData", JSON.stringify(tableData));
    sessionStorage.setItem("pagination", JSON.stringify(pagination));
  }, [tableData, pagination]);

  useEffect(() => {
    // 当从详情页返回时，尝试从 sessionStorage 恢复数据
    const storedListData = sessionStorage.getItem("listData");
    const storedPagination = sessionStorage.getItem("pagination");
    if (storedListData && storedPagination) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setTableData(JSON.parse(storedListData));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setPagination(JSON.parse(storedPagination));
    }
  }, []);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/poetry?page=${page}&pageSize=${pageSize}`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setTableData(data.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      setPagination((prev) => ({ ...prev, total: data.total }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // 可以在这里添加错误处理逻辑
    } finally {
      setLoading(false);
    }
  };

  useUpdateEffect(() => {
    void fetchData(pagination.page, pagination.pageSize);
  }, [pagination.page, pagination.pageSize]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 xl:pl-8">标题</TableHead>
            <TableHead>作者</TableHead>
            <TableHead>诗词</TableHead>
            <TableHead className="pr-4 text-right xl:pr-8">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? // 加载状态下显示骨架屏
              Array.from({ length: pagination.pageSize }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[20dvw] pl-4">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="w-[40dvw]">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <Skeleton className="ml-auto h-4 w-10" />
                  </TableCell>
                </TableRow>
              ))
            : // 数据加载完成后显示实际数据
              tableData.map((row) => (
                <TableRow className="h-16" key={row.id}>
                  <TableCell className="w-[20dvw] pl-4 font-medium xl:pl-8">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.writer}</TableCell>
                  <TableCell className="w-[40dvw]">
                    <div className="line-clamp-2">{row.content}</div>
                  </TableCell>
                  <TableCell className="pr-4 text-right xl:pr-8">
                    <Link className="text-blue-500 dark:text-blue-400 hover:underline" href={`/poetry/${row.id}?title=${row.title}`} key={row.id}>
                      详情
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <Pagination {...pagination} onPageChange={handlePageChange} />
    </>
  );
}
