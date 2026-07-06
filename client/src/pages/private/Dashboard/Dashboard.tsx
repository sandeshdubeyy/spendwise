import { Card } from "../../../components/common/Card";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";

const Dashboard = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Dashboard</h1>
        <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
          Overview of your finances.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Balance</h3>
          <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>$12,480</div>
        </Card>

        <Card className="p-6">
          <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Income</h3>
          <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>$5,200</div>
        </Card>

        <Card className="p-6">
          <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Expenses</h3>
          <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>$2,840</div>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;