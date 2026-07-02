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

export interface PieChartItem {
	name: string;
	value: number;
	color: string;
}

interface PieChartCardProps {
	title: string;
	data: PieChartItem[];
	className?: string;
}

const PieChartCard = ({ title, data, className }: PieChartCardProps) => {
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
						<PieChart>
							<Pie
								data={data}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={90}
								innerRadius={55}
								paddingAngle={2}
							>
								{data.map((entry) => (
									<Cell key={entry.name} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</CardBody>
		</Card>
	);
};

export default PieChartCard;