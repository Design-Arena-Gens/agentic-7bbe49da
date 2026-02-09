'use client';

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";

type Expense = {
  id: number;
  vendor: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  isRecurring?: boolean;
  frequency?: "Weekly" | "Monthly" | "Quarterly" | "Annual";
  memo?: string;
};

const EXPENSES: Expense[] = [
  {
    id: 1,
    vendor: "Evergreen Grocers",
    category: "Groceries",
    amount: 142.83,
    date: "2025-01-14",
    paymentMethod: "Visa • 0921",
  },
  {
    id: 2,
    vendor: "City Metro Pass",
    category: "Transportation",
    amount: 72.0,
    date: "2025-01-12",
    paymentMethod: "Visa • 0921",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 3,
    vendor: "Kindle Unlimited",
    category: "Subscriptions",
    amount: 11.99,
    date: "2025-01-11",
    paymentMethod: "Amex • 4411",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 4,
    vendor: "Sunrise Apartments",
    category: "Housing",
    amount: 1950.0,
    date: "2025-01-01",
    paymentMethod: "Checking • 2019",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 5,
    vendor: "Peak Fitness",
    category: "Wellness",
    amount: 55.0,
    date: "2025-01-05",
    paymentMethod: "Visa • 0921",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 6,
    vendor: "Bluebird Bistro",
    category: "Dining",
    amount: 48.27,
    date: "2025-01-16",
    paymentMethod: "Visa • 0921",
    memo: "Dinner with Sam",
  },
  {
    id: 7,
    vendor: "Lumen Electric",
    category: "Utilities",
    amount: 126.45,
    date: "2025-01-08",
    paymentMethod: "Checking • 2019",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 8,
    vendor: "Green Wheels Ride",
    category: "Transportation",
    amount: 18.6,
    date: "2025-01-18",
    paymentMethod: "Apple Pay",
  },
  {
    id: 9,
    vendor: "Nordic Air Travel",
    category: "Travel",
    amount: 412.75,
    date: "2024-12-28",
    paymentMethod: "Amex • 4411",
    memo: "Conference trip",
  },
  {
    id: 10,
    vendor: "Harvest Market",
    category: "Groceries",
    amount: 93.35,
    date: "2024-12-21",
    paymentMethod: "Visa • 0921",
  },
  {
    id: 11,
    vendor: "Hulu",
    category: "Subscriptions",
    amount: 14.99,
    date: "2024-12-30",
    paymentMethod: "Amex • 4411",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 12,
    vendor: "Bright Future 529",
    category: "Education",
    amount: 150.0,
    date: "2024-12-29",
    paymentMethod: "Checking • 2019",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 13,
    vendor: "Home Essentials",
    category: "Household",
    amount: 63.88,
    date: "2024-12-18",
    paymentMethod: "Visa • 0921",
  },
  {
    id: 14,
    vendor: "Atlas Insurance",
    category: "Insurance",
    amount: 228.4,
    date: "2024-12-01",
    paymentMethod: "Checking • 2019",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 15,
    vendor: "City Arts Theater",
    category: "Entertainment",
    amount: 62.5,
    date: "2025-01-10",
    paymentMethod: "Amex • 4411",
  },
  {
    id: 16,
    vendor: "Focus Coffee",
    category: "Dining",
    amount: 9.75,
    date: "2025-01-17",
    paymentMethod: "Apple Pay",
  },
  {
    id: 17,
    vendor: "BrightFiber Internet",
    category: "Utilities",
    amount: 89.99,
    date: "2025-01-03",
    paymentMethod: "Checking • 2019",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 18,
    vendor: "Trailhead Outdoor",
    category: "Shopping",
    amount: 134.2,
    date: "2024-11-25",
    paymentMethod: "Visa • 0921",
  },
  {
    id: 19,
    vendor: "Garden Fresh CSA",
    category: "Groceries",
    amount: 38.5,
    date: "2024-11-15",
    paymentMethod: "Visa • 0921",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 20,
    vendor: "Calm Minds App",
    category: "Wellness",
    amount: 5.99,
    date: "2024-12-15",
    paymentMethod: "Amex • 4411",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 21,
    vendor: "Emerald Taxi",
    category: "Transportation",
    amount: 26.4,
    date: "2024-12-26",
    paymentMethod: "Visa • 0921",
  },
  {
    id: 22,
    vendor: "Fresh Fix Meal Kit",
    category: "Groceries",
    amount: 86.0,
    date: "2025-01-06",
    paymentMethod: "Visa • 0921",
    isRecurring: true,
    frequency: "Weekly",
  },
  {
    id: 23,
    vendor: "Glow Power",
    category: "Utilities",
    amount: 118.12,
    date: "2024-11-05",
    paymentMethod: "Checking • 2019",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 24,
    vendor: "Happy Kids Sitter",
    category: "Family",
    amount: 94.0,
    date: "2024-12-09",
    paymentMethod: "Amex • 4411",
  },
  {
    id: 25,
    vendor: "Summit Savings",
    category: "Savings",
    amount: 400.0,
    date: "2025-01-02",
    paymentMethod: "Checking • 2019",
    isRecurring: true,
    frequency: "Monthly",
  },
];

const CATEGORY_BUDGETS: Record<string, number> = {
  Groceries: 550,
  Dining: 220,
  Transportation: 160,
  Housing: 1950,
  Utilities: 260,
  Wellness: 120,
  Subscriptions: 80,
  Entertainment: 120,
  Travel: 500,
  Shopping: 150,
  Household: 120,
  Insurance: 230,
  Education: 150,
  Family: 120,
  Savings: 400,
};

type Timeframe = "30" | "90" | "ytd" | "all";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "2-digit",
});

const chartColors = [
  "#2563eb",
  "#db2777",
  "#16a34a",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#0ea5e9",
];

const timeframeOptions: { label: string; value: Timeframe }[] = [
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
  { label: "Year to date", value: "ytd" },
  { label: "All time", value: "all" },
];

const uniqueCategories = Array.from(
  new Set(EXPENSES.map((expense) => expense.category)),
).sort();

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

const trendTooltipFormatter: TooltipProps<number, string>["formatter"] = (
  value,
) => [
  currencyFormatter.format(value ?? 0),
  "Total spend",
];

const pieTooltipFormatter: TooltipProps<number, string>["formatter"] = (
  value,
) => [
  currencyFormatter.format(value ?? 0),
  "Spent",
];

function diffInDays(a: Date, b: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const start = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const end = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((start - end) / msPerDay);
}

function buildTimeframeRange(timeframe: Timeframe, today: Date) {
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  if (timeframe === "all") {
    const sortedDates = [...EXPENSES]
      .map((expense) => new Date(expense.date))
      .sort((a, b) => a.getTime() - b.getTime());
    const startDate = sortedDates[0] ?? endDate;
    return {
      startDate,
      endDate,
      previousStartDate: null,
      previousEndDate: null,
    };
  }

  let startDate: Date;

  if (timeframe === "ytd") {
    startDate = new Date(endDate.getFullYear(), 0, 1);
  } else {
    const days = Number(timeframe);
    startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (days - 1));
  }

  const rangeLength = diffInDays(endDate, startDate) || 1;

  const previousEndDate = new Date(startDate);
  previousEndDate.setDate(startDate.getDate() - 1);

  const previousStartDate = new Date(previousEndDate);
  previousStartDate.setDate(previousEndDate.getDate() - rangeLength);

  return { startDate, endDate, previousStartDate, previousEndDate };
}

function formatRelative(date: Date, base: Date) {
  const diff = diffInDays(date, base);
  if (Math.abs(diff) < 7) {
    return relativeTimeFormatter.format(-diff, "day");
  }
  return dateFormatter.format(date);
}

export default function Home() {
  const today = useMemo(() => new Date(), []);
  const [timeframe, setTimeframe] = useState<Timeframe>("30");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [recurringOnly, setRecurringOnly] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { startDate, endDate, previousStartDate, previousEndDate } =
    useMemo(() => buildTimeframeRange(timeframe, today), [timeframe, today]);

  const filteredExpenses = useMemo(() => {
    return EXPENSES.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const isAfterStart = !startDate
        ? true
        : expenseDate >= startDate && expenseDate <= endDate;
      const matchesCategory =
        selectedCategory === "all" || expense.category === selectedCategory;
      const matchesRecurring = !recurringOnly || expense.isRecurring;
      return isAfterStart && matchesCategory && matchesRecurring;
    }).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [startDate, endDate, selectedCategory, recurringOnly]);

  const previousPeriodExpenses = useMemo(() => {
    if (!previousStartDate || !previousEndDate) return [];
    return EXPENSES.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate >= previousStartDate && expenseDate <= previousEndDate
      );
    });
  }, [previousStartDate, previousEndDate]);

  const totals = useMemo(() => {
    const total = filteredExpenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    const previousTotal = previousPeriodExpenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    const variation =
      previousTotal > 0 ? ((total - previousTotal) / previousTotal) * 100 : 0;

    const dailyAverage = (() => {
      if (!startDate) return total;
      const totalDays =
        diffInDays(endDate, startDate) >= 0
          ? diffInDays(endDate, startDate) + 1
          : 1;
      return total / totalDays;
    })();

    return {
      total,
      previousTotal,
      variation,
      dailyAverage,
    };
  }, [filteredExpenses, previousPeriodExpenses, startDate, endDate]);

  const categoryTotals = useMemo(() => {
    return filteredExpenses.reduce<Record<string, number>>((acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    }, {});
  }, [filteredExpenses]);

  const topCategory = useMemo(() => {
    const entries = Object.entries(categoryTotals);
    if (!entries.length) return null;
    const [category, amount] = entries.sort((a, b) => b[1] - a[1])[0];
    const budget = CATEGORY_BUDGETS[category];
    const percentOfBudget = budget
      ? Math.round((amount / budget) * 100)
      : undefined;
    return { category, amount, percentOfBudget };
  }, [categoryTotals]);

  const monthlyTrendData = useMemo(() => {
    const buckets = new Map<
      string,
      { key: string; label: string; amount: number }
    >();

    filteredExpenses.forEach((expense) => {
      const date = new Date(expense.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!buckets.has(key)) {
        buckets.set(key, {
          key,
          label: monthFormatter.format(date),
          amount: 0,
        });
      }
      const bucket = buckets.get(key);
      if (bucket) {
        bucket.amount += expense.amount;
      }
    });

    return Array.from(buckets.values())
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((entry) => ({
        month: entry.label,
        amount: Number(entry.amount.toFixed(2)),
      }));
  }, [filteredExpenses]);

  const budgetProgress = useMemo(() => {
    return Object.entries(CATEGORY_BUDGETS)
      .map(([category, budget]) => {
        const spent = categoryTotals[category] ?? 0;
        const percent = budget > 0 ? Math.min((spent / budget) * 100, 150) : 0;
        const difference = budget - spent;
        return { category, budget, spent, percent, difference };
      })
      .filter(({ spent }) => spent > 0 || timeframe === "all")
      .sort((a, b) => b.spent - a.spent);
  }, [categoryTotals, timeframe]);

  const paymentMethodBreakdown = useMemo(() => {
    return filteredExpenses.reduce<Record<string, number>>((acc, expense) => {
      acc[expense.paymentMethod] =
        (acc[expense.paymentMethod] ?? 0) + expense.amount;
      return acc;
    }, {});
  }, [filteredExpenses]);

  const recurringPayments = useMemo(() => {
    return filteredExpenses.filter((expense) => expense.isRecurring);
  }, [filteredExpenses]);

  const netVariance = totals.total - totals.previousTotal;

  return (
    <div className="min-h-screen bg-zinc-100 pb-16 pt-10 text-zinc-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6">
        <header className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg shadow-zinc-900/5">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-zinc-950 sm:text-4xl">
                Spending Compass
              </h1>
              <p className="text-sm text-zinc-500 sm:text-base">
                Track every dollar, understand habits, and stay ahead of your
                budget.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {timeframeOptions.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTimeframe(value)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      timeframe === value
                        ? "border-blue-500 bg-blue-500 text-white shadow"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                Updated {formatRelative(today, endDate)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-blue-500 focus:bg-white focus:text-zinc-900 md:max-w-xs"
            >
              <option value="all">All categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-3 rounded-2xl border border-transparent bg-zinc-100 px-4 py-3 text-sm text-zinc-600 transition hover:bg-zinc-200 md:self-start">
              <input
                type="checkbox"
                checked={recurringOnly}
                onChange={(event) => setRecurringOnly(event.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
              />
              Show only recurring charges
            </label>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5">
            <p className="text-sm font-medium text-zinc-500">Total spent</p>
            <p className="mt-2 text-3xl font-semibold text-zinc-950">
              {currencyFormatter.format(totals.total)}
            </p>
            {previousPeriodExpenses.length > 0 && (
              <p
                className={`mt-3 inline-flex items-center gap-2 text-sm font-medium ${
                  netVariance >= 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                {netVariance >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(totals.variation).toFixed(1)}% vs previous period
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5">
            <p className="text-sm font-medium text-zinc-500">
              Daily average spend
            </p>
            <p className="mt-2 text-3xl font-semibold text-zinc-950">
              {currencyFormatter.format(totals.dailyAverage || 0)}
            </p>
            {previousPeriodExpenses.length > 0 && (
              <p className="mt-3 text-sm text-zinc-500">
                Previous: {currencyFormatter.format(totals.previousTotal)}
              </p>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5">
            <p className="text-sm font-medium text-zinc-500">
              Top spending category
            </p>
            <p className="mt-2 text-xl font-semibold text-zinc-950">
              {topCategory ? topCategory.category : "—"}
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              {topCategory
                ? `${currencyFormatter.format(topCategory.amount)} spent${
                    topCategory.percentOfBudget
                      ? ` · ${topCategory.percentOfBudget}% of budget`
                      : ""
                  }`
                : "No spend recorded"}
            </p>
          </div>

  <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5">
    <p className="text-sm font-medium text-zinc-500">Recurring charges</p>
    <p className="mt-2 text-3xl font-semibold text-zinc-950">
      {currencyFormatter.format(
        recurringPayments.reduce((sum, expense) => sum + expense.amount, 0),
      )}
    </p>
    <p className="mt-3 text-sm text-zinc-500">
      {recurringPayments.length} active subscriptions
    </p>
  </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">
                Spending trend
              </h2>
              <span className="text-xs font-medium uppercase text-zinc-400">
                {monthlyTrendData.length} months
              </span>
            </div>
            <div className="mt-6 h-64 w-full">
              {isMounted ? (
                <ResponsiveContainer>
                  <AreaChart data={monthlyTrendData}>
                    <defs>
                      <linearGradient
                        id="trendColor"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563eb"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="#2563eb"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#f1f1f1" strokeDasharray="4 4" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                      stroke="#a1a1aa"
                    />
                    <YAxis
                      tickFormatter={(value: number) =>
                        `$${Math.round(value / 100)}00`
                      }
                      tickLine={false}
                      axisLine={false}
                      stroke="#a1a1aa"
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "4 4", stroke: "#111827" }}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        border: "1px solid #e4e4e7",
                      }}
                      formatter={trendTooltipFormatter}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#trendColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100" />
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">
                Payment methods
              </h2>
              <span className="text-xs font-medium uppercase text-zinc-400">
                Current view
              </span>
            </div>
            <div className="mt-6 h-64">
              {isMounted ? (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={Object.entries(paymentMethodBreakdown).map(
                        ([method, amount]) => ({
                          method,
                          amount,
                        }),
                      )}
                      innerRadius={60}
                      outerRadius={92}
                      paddingAngle={4}
                      dataKey="amount"
                    >
                      {Object.entries(paymentMethodBreakdown).map(
                        ([method], index) => (
                          <Cell
                            key={method}
                            fill={chartColors[index % chartColors.length]}
                          />
                        ),
                      )}
                    </Pie>
                    <Tooltip
                      formatter={pieTooltipFormatter}
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        border: "1px solid #e4e4e7",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-100" />
              )}
            </div>
            <div className="mt-4 space-y-2">
              {Object.entries(paymentMethodBreakdown).map(
                ([method, amount], index) => (
                  <div
                    key={method}
                    className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            chartColors[index % chartColors.length],
                        }}
                      />
                      {method}
                    </div>
                    <span className="font-medium text-zinc-900">
                      {currencyFormatter.format(amount)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">
                Category health
              </h2>
              <span className="text-xs font-medium uppercase text-zinc-400">
                Budget vs spend
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {budgetProgress.slice(0, 8).map((item) => {
                const remaining = item.difference;
                const status =
                  remaining < 0
                    ? { label: "Over budget", color: "text-red-500" }
                    : item.percent > 90
                      ? { label: "At risk", color: "text-orange-500" }
                      : { label: "On track", color: "text-green-600" };

                return (
                  <div
                    key={item.category}
                    className="rounded-2xl border border-zinc-100 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-zinc-500">
                          {item.category}
                        </p>
                        <p className="text-lg font-semibold text-zinc-900">
                          {currencyFormatter.format(item.spent)}{" "}
                          <span className="text-sm font-medium text-zinc-400">
                            of {currencyFormatter.format(item.budget)}
                          </span>
                        </p>
                      </div>
                      <p className={`text-sm font-medium ${status.color}`}>
                        {status.label}
                      </p>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-zinc-200">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${Math.min(item.percent, 100)}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-zinc-500">
                      {remaining >= 0
                        ? `${currencyFormatter.format(
                            remaining,
                          )} remaining`
                        : `${currencyFormatter.format(
                            Math.abs(remaining),
                          )} over budget`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">
                Recurring spotlight
              </h2>
              <span className="text-xs font-medium uppercase text-zinc-400">
                {recurringPayments.length} active
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {recurringPayments.map((expense) => {
                const expenseDate = new Date(expense.date);
                return (
                  <div
                    key={expense.id}
                    className="rounded-2xl border border-zinc-100 p-4 text-sm text-zinc-600"
                  >
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        {expense.frequency ?? "Recurring"}
                      </span>
                      <span>{formatRelative(expenseDate, today)}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-base font-semibold text-zinc-900">
                          {expense.vendor}
                        </p>
                        <p>{expense.category}</p>
                      </div>
                      <span className="text-base font-semibold text-zinc-900">
                        {currencyFormatter.format(expense.amount)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400">
                      {expense.paymentMethod}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-md shadow-zinc-900/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Expense ledger
              </h2>
              <p className="text-sm text-zinc-500">
                Detailed activity for the selected view.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span>
                Period: {dateFormatter.format(startDate)} →{" "}
                {dateFormatter.format(endDate)}
              </span>
              {previousStartDate && previousEndDate ? (
                <span>
                  Previous: {dateFormatter.format(previousStartDate)} →{" "}
                  {dateFormatter.format(previousEndDate)}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-100">
            <div className="max-h-[460px] overflow-y-auto">
              <table className="min-w-full divide-y divide-zinc-100 text-sm">
                <thead className="bg-zinc-50 text-left uppercase tracking-wide text-xs text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Vendor</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Payment</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredExpenses.map((expense) => {
                    const expenseDate = new Date(expense.date);
                    return (
                      <tr
                        key={expense.id}
                        className="transition hover:bg-blue-50/40"
                      >
                        <td className="px-6 py-4 text-zinc-500">
                          <div className="font-medium text-zinc-900">
                            {dateFormatter.format(expenseDate)}
                          </div>
                          <div className="text-xs">
                            {formatRelative(expenseDate, today)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-zinc-900">
                            {expense.vendor}
                          </div>
                          {expense.memo ? (
                            <div className="text-xs text-zinc-500">
                              {expense.memo}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-500">
                          {expense.paymentMethod}
                          {expense.isRecurring ? (
                            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-600">
                              Recurring
                            </span>
                          ) : null}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-zinc-900">
                          {currencyFormatter.format(expense.amount)}
                        </td>
                      </tr>
                    );
                  })}
                  {!filteredExpenses.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-sm text-zinc-400"
                      >
                        No transactions matched your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
