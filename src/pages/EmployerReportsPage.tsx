import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Users } from "lucide-react";
import { toast } from "sonner";
const ReportItem = ({ title, description, icon: Icon, onDownload }: { title: string, description: string, icon: React.ElementType, onDownload: () => void }) => (
  <div className="flex items-center justify-between rounded-lg border p-4">
    <div className="flex items-center gap-4">
      <Icon className="h-8 w-8 text-muted-foreground" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <Button variant="outline" size="sm" onClick={onDownload}>
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  </div>
);
export function EmployerReportsPage() {
  const handleDownload = (reportName: string) => {
    toast.success(`${reportName} download started!`, {
      description: `Your mock ${reportName.toLowerCase()} is being generated.`,
    });
    // Mock file download logic
    const content = `Mock Report: ${reportName}\nGenerated on: ${new Date().toISOString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and download reports for your records.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Select a report to generate and download.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReportItem
            title="Monthly Contribution Summary"
            description="A summary of total contributions for the last month."
            icon={FileText}
            onDownload={() => handleDownload("Monthly Contribution Summary")}
          />
          <ReportItem
            title="Annual Contribution Statement"
            description="A detailed statement of all contributions for the last year."
            icon={FileText}
            onDownload={() => handleDownload("Annual Contribution Statement")}
          />
          <ReportItem
            title="Active Employee Roster"
            description="A list of all currently active employees."
            icon={Users}
            onDownload={() => handleDownload("Active Employee Roster")}
          />
          <ReportItem
            title="Terminated Employee Report"
            description="A list of employees terminated in the last quarter."
            icon={Users}
            onDownload={() => handleDownload("Terminated Employee Report")}
          />
        </CardContent>
      </Card>
    </div>
  );
}