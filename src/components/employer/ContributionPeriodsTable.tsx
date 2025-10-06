import { useState, useMemo } from "react";
import { ContributionPeriod } from "@shared/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "HKD",
  }).format(value);
};
const ITEMS_PER_PAGE = 10;
interface ContributionPeriodsTableProps {
  periods: ContributionPeriod[];
}
export function ContributionPeriodsTable({ periods }: ContributionPeriodsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPeriods = useMemo(() => {
    return periods.filter((p) =>
      p.period.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [periods, searchTerm]);
  const totalPages = Math.max(1, Math.ceil(filteredPeriods.length / ITEMS_PER_PAGE));
  const paginatedPeriods = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPeriods.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPeriods, currentPage]);
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const getStatusBadgeVariant = (status: ContributionPeriod['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default:
        return 'outline';
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <CardTitle>All Contribution Periods</CardTitle>
            <CardDescription>Search and browse your company's contribution history.</CardDescription>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by period (e.g., May 2024)..."
              className="pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPeriods.length > 0 ? (
              paginatedPeriods.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.period}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(getStatusBadgeVariant(p.status))}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{p.paymentDate ? format(new Date(p.paymentDate), "dd MMM, yyyy") : 'N/A'}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(p.amount)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No contribution periods found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex items-center justify-end space-x-2 p-4 border-t">
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </Card>
  );
}