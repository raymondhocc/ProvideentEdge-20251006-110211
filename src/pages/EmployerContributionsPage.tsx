import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { ContributionPeriod } from "@shared/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ContributionPeriodsTable } from "@/components/employer/ContributionPeriodsTable";
export function EmployerContributionsPage() {
  const [periods, setPeriods] = useState<ContributionPeriod[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        setLoading(true);
        const data = await api<ContributionPeriod[]>("/api/employer/periods");
        setPeriods(data);
      } catch (error) {
        console.error("Failed to fetch contribution periods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPeriods();
  }, []);
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contribution History</h1>
        <p className="text-muted-foreground">
          A complete record of your company's MPF contributions.
        </p>
      </div>
      {loading ? (
        <Skeleton className="h-[400px]" />
      ) : periods ? (
        <ContributionPeriodsTable periods={periods} />
      ) : (
        <div>Error loading contribution data. Please try again.</div>
      )}
    </div>
  );
}