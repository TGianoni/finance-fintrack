'use client'

import { TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Cell, Pie, PieChart } from 'recharts'

import { useGetUserBalanceGraphic } from '@/api/hooks/user'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatCurrency } from '@/helpers/currency'

const chartConfig = {
  earning: { label: 'Ganhos', color: '#22C55E' }, // Green
  expense: { label: 'Despesas', color: '#EF4444' }, // Red
  investment: { label: 'Investimentos', color: '#A855F7' }, // Purple
}

export const ChartPieDonutGraphic = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { data } = useGetUserBalanceGraphic({ from, to })

  console.log({ data })

  // --- Transformando dados da API para o formato do gráfico
  const chartData = [
    { name: 'Ganhos', key: 'earning', value: Number(data?.earningsPercentage) },
    {
      name: 'Despesas',
      key: 'expense',
      value: Number(data?.expensesPercentage),
    },
    {
      name: 'Investimentos',
      key: 'investment',
      value: Number(data?.investmentsPercentage),
    },
  ]

  console.log({ chartData })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gráfico</CardTitle>
        <CardDescription>Análise gráfica financeira</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >
              {chartData.map((entry) => (
                <Cell key={entry.key} fill={chartConfig[entry.key].color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Nesta data, o seu saldo é de{' '}
          <p
            className={
              data?.balance >= 0 ? 'text-primary-green' : 'text-primary-red'
            }
          >
            {formatCurrency(data?.balance)}
          </p>
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Análise gráfica de acordo com a data estipulada!
        </div>
      </CardFooter>
    </Card>
  )
}
