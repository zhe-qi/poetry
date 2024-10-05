import React from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const handlePageClick = (newPage: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const getPaginationItems = () => {
    const items = [];
    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, page + 1);

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={handlePageClick(1)}>
            1
          </PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === page}
            onClick={handlePageClick(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={handlePageClick(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <ShadcnPagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePageClick(page - 1)}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        {getPaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handlePageClick(page + 1)}
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
