import { z } from 'zod';
export const PortfolioAllocationSchema = z.record(z.string().min(1), z.number().min(0).max(100))
  .refine(
    (allocations) => {
      if (Object.keys(allocations).length === 0) return true;
      const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
      // Allow for small floating point inaccuracies
      return Math.abs(total - 100) < 0.001;
    },
    {
      message: "Total allocation must be 100%",
    }
  );
export const UpdatePortfolioRequestSchema = z.object({
    allocation: PortfolioAllocationSchema
});