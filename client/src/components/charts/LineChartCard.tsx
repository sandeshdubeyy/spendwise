import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card, CardBody, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

export interface LineChartItem {
	name: string;
	amount: number;
}

interface LineChartCardProps {
	title: string;
	data: LineChartItem[];
	className?: string;
}

const LineChartCard = ({ title, data, className }: LineChartCardProps) => {
	return (
		<Card className={className}>
			<CardHeader>
				<h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
					{title}
				</h3>
			</CardHeader>

			<CardBody>
				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={data}>
							<CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
							<XAxis dataKey="name" tick={{ fill: "currentColor" }} />
							<YAxis tick={{ fill: "currentColor" }} />
							<Tooltip />
							<Line
								type="monotone"
								dataKey="amount"
								stroke="#2563eb"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardBody>
		</Card>
	);
};

export default LineChartCard;