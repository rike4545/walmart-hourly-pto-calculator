# Walmart Hourly PTO & PPTO Calculator

An independent, browser-based estimator for PTO and Protected PTO accrual for Walmart, Sam's Club, and Supply Chain hourly associates.

**Live source chart:** [Paid Time Off Plans and Earning Rates — Field Walmart, Sam's, and Supply Chain Hourly Associates](https://one.walmart.com/content/dam/themepage/pdfs/PTO-Plans_Hourly-WM-Sams_Earning-Chart.pdf) (effective July 1, 2024).

## Features

- Select from the six plan groupings in the source chart, including the Continuous Protected PTO Plan for New York.
- Select full-time, part-time, or temporary status.
- Estimate PTO and PPTO from average weekly work hours and a projection period.
- Enter current balances, plan-year accrual-to-date, and planned time usage.
- Apply the annual earning caps shown in the selected chart, including the redirection of PPTO-rate accrual to PTO after the PPTO maximum is reached.
- Responsive, dependency-free static website. No sign-in and no data sent to a server.

## Run locally

Open `index.html` in a modern browser. No build step or package installation is required.

## Calculation assumptions and limitations

1. The rates and caps are transcribed from the linked Walmart chart marked **effective 7/1/2024**. They are not represented as current policy for every associate in 2026 or later.
2. The user must select the correct plan. The chart lists New York (including NYC and Westchester) under the Continuous Protected PTO Plan.
3. Projection uses the selected current service-year band for the entire projection. It does not model a service anniversary during the forecast.
4. The user enters plan-year earnings-to-date separately from current balances. Balance and accrual-cap calculations are different.
5. The chart explains that after the PPTO maximum is earned, the PPTO portion of the rate is instead earned as PTO until the PTO maximum is reached. The calculator models that rule.
6. Continuous plans are marked “No max” in the chart; this calculator treats those earning caps as unlimited.
7. Actual results may depend on service hours, paid time off usage, leave status, local law, policy updates, and Walmart's payroll/timekeeping calculations. This is an estimate only. Verify in GTA / OneWalmart or with People Services.

## Source plan map

- National Protected PTO Plan
- Standard Protected PTO Plan
- Continuous Protected PTO Plan
- Standard Protected PTO Plan with Kin Care — Illinois
- Chicago, Illinois — Kin Care
- Continuous Protected PTO Plan with Kin Care — California and Nevada

The chart's page 1 lists the geographic plan groupings; detailed tables are on pages 2–7.

## Disclaimer

This is an unofficial independent tool and is not affiliated with, endorsed by, or operated by Walmart Inc. The source chart is Walmart's material; all trademarks belong to their respective owners. This project does not replace company policy, local law, GTA, or a People Services determination.
