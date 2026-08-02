import { useEffect, useState } from "react";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Card, CardBody, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getPaymentMethodBreakdown } from "../../services/analytics.services";

interface PaymentMethodBreakdownItem {
    paymentMethod: string;
    totalSpent: number;
}

const COLORS_LIST = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const PaymentMethodDonutCard = () => {
    const [data, setData] = useState<PaymentMethodBreakdownItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getPaymentMethodBreakdown();
                setData(result);
            } catch {
                setError("Couldn't load payment method breakdown.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Payment Method Breakdown</h3>
                </CardHeader>
                <CardBody>
                    <div className="h-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </CardBody>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Payment Method Breakdown</h3>
                </CardHeader>
                <CardBody>
                    <p className={cn("text-sm", COLORS.danger)}>{error}</p>
                </CardBody>
            </Card>
        );
    }

    const chartData = data.map((item, index) => ({
        ...item,
        name: item.paymentMethod,
        value: item.totalSpent,
        color: COLORS_LIST[index % COLORS_LIST.length],
    }));

    return (
        <Card>
            <CardHeader>
                <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Payment Method Breakdown</h3>
            </CardHeader>

            <CardBody>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={55}
                                paddingAngle={2}
                            >
                                {chartData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) =>
                                    formatMoney(typeof value === "number" ? value : Number(value ?? 0))
                                }
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
};

export default PaymentMethodDonutCard;