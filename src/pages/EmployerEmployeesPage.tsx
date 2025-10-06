import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { ManagedEmployee } from "@shared/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ManagedEmployeesTable } from "@/components/employer/ManagedEmployeesTable";
export function EmployerEmployeesPage() {
  const [employees, setEmployees] = useState<ManagedEmployee[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await api<ManagedEmployee[]>("/api/employer/employees");
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch managed employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Employees</h1>
        <p className="text-muted-foreground">
          View, search, and manage your company's employee records.
        </p>
      </div>
      {loading ? (
        <Skeleton className="h-[400px]" />
      ) : employees ? (
        <ManagedEmployeesTable employees={employees} />
      ) : (
        <div>Error loading employee data. Please try again.</div>
      )}
    </div>
  );
}